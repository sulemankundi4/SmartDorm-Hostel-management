const Users = require("../models/user");
const { tryCatch, errorHandler } = require("../utils/features");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/email");
const juice = require("juice");
const { css, generateEmailTemplate } = require("../utils/confirmEmailTemplate");
const Student = require("../models/student");

const signToken = (id, type) => {
  return jwt.sign({ id, type }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res, isEmailConfirming, type) => {
  const token = signToken(user._id, type);

  const cookiesOption = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: ".vercel.app",
    path: "/",
  };

  res.cookie("jwt", token, cookiesOption);
  user.ConfirmPassword = undefined;

  if (!isEmailConfirming) {
    res.status(statusCode).json({
      status: "success",
      token,
      payLoad: {
        user,
      },
    });
  }
};

const signUp = tryCatch(async (req, res, next) => {
  const { Name, Email, Password, ConfirmPassword, Role } = req.body;

  if (!Name || !Email || !Password || !ConfirmPassword) {
    return next(new errorHandler("Please provide all the required fields", 400));
  }

  // Check if email already exists in User or Student models
  const existingUser = await Users.findOne({ Email });
  const existingStudent = await Student.findOne({ Email });

  if (existingUser || existingStudent) {
    return next(new errorHandler("Email already exists", 400));
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const token = crypto.createHash("sha256").update(verificationToken).digest("hex");
  const tokenExpire = Date.now() + 24 * 60 * 60 * 1000;

  const user = await Users.create({
    Name,
    Email,
    Password,
    ConfirmPassword,
    Role,
    EmailVerificationToken: token,
    EmailVerificationTokenExpires: tokenExpire,
  });
  const verificatonLink = `${req.protocol}://${req.get("host")}/api/v1/users/verifyEmail/${verificationToken}`;
  const html = generateEmailTemplate(verificatonLink, user);
  const message = juice.inlineContent(html, css); //npm i juice

  try {
    await sendEmail({
      email: user.Email,
      subject: "Email Verification Token valid for 24 Hours",
      message,
    });

    createAndSendToken(user, 200, res, false, Role);

    res.status(200).json({
      status: "success",
      message: "Email has been sent to the user",
    });
  } catch (e) {
    return next(new errorHandler("Email could not be sent", 500));
  }
});

const login = tryCatch(async (req, res, next) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return next(new errorHandler("Please provide email and password", 400));
  }

  const [existingStudent, existingUser] = await Promise.all([Student.findOne({ Email }).select("+Password"), Users.findOne({ Email }).select("+Password")]);

  let user;
  if (existingStudent) {
    user = existingStudent;
  } else if (existingUser) {
    user = existingUser;
  }

  if (!user || !(await user.correctPassword(Password, user.Password))) {
    return next(new errorHandler("Incorrect email or password", 401));
  }

  if (user.AccountStatus === false) {
    return next(new errorHandler("Account is inactive", 401));
  }

  createAndSendToken(user, 200, res, false, "user");
});

const verifyEmail = tryCatch(async (req, res, next) => {
  const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await Users.findOne({
    EmailVerificationToken: hashedToken,
    EmailVerificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new errorHandler("Token is invalid or has expired", 400));
  }

  user.IsEmailVerified = true;
  user.EmailVerificationToken = undefined;
  user.EmailVerificationTokenExpires = undefined;

  await user.save({ validateBeforeSave: false });
  createAndSendToken(user, 200, res, true, "user");
  next();
});

const redirect = tryCatch(async (req, res, next) => {
  res.redirect(`http://localhost:5173/emailVerified`);
});

const getUserById = tryCatch(async (req, res, next) => {
  const [getUserByID, getStudentById] = await Promise.all([Users.findById(req.params.id), Student.findById(req.params.id)]);
  const user = getUserByID || getStudentById;

  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    payLoad: {
      user,
    },
  });
});

const resendVerificationMail = tryCatch(async (req, res, next) => {
  const { Email } = req.params;
  if (!Email) return next(new errorHandler("Please provide email", 400));

  const user = await Users.findOne({ Email });

  if (!user) return next(new errorHandler("User not found", 404));
  if (user.IsEmailVerified) return next(new errorHandler("Email already verified", 400));

  const emailVerificationToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });
  const verificatonLink = `${req.protocol}://${req.get("host")}/api/v1/users/verifyEmail/${emailVerificationToken}`;

  const html = generateEmailTemplate(verificatonLink, user);
  const message = juice.inlineContent(html, css);

  try {
    await sendEmail({
      email: user.Email,
      subject: "Email Verification valid for 24 Hours",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Email has been sent to the user",
    });
  } catch (e) {
    user.EmailVerificationToken = undefined;
    user.EmailVerificationTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new errorHandler("Email could not be sent", 500));
  }
});

const getAllUsers = tryCatch(async (req, res, next) => {
  const users = await Users.find();

  res.status(200).json({
    status: "success",
    payLoad: {
      users,
    },
  });
});

const deletUser = tryCatch(async (req, res, next) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  user.AccountStatus = false;
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: "success",
    message: "User deleted successfully",
  });
});

//Google auth below here
const googleAuth = tryCatch(async (req, res, next) => {
  const { Name, Email, uid, isOwner } = req.body;
  if (!Name || !Email || !uid) {
    return next(new errorHandler("Please provide all the required fields", 400));
  }

  const userAlreadyExists = await Users.findOne({ Email });

  if (userAlreadyExists) {
    createAndSendToken(userAlreadyExists, 200, res, false, "user");
    return res.status(200).json({
      status: "success",
      payLoad: {
        user: userAlreadyExists,
      },
    });
  }

  const user = await Users.create({
    uid,
    Name,
    Email,
    Password: "dummy", // dummy value
    ConfirmPassword: "dummy",
  });

  user.Password = undefined;
  if (isOwner) {
    user.Role = "owner";
  }
  user.IsEmailVerified = true;
  await user.save({ validateBeforeSave: false });
  createAndSendToken(user, 200, res, false, "user");

  return res.status(200).json({
    status: "success",
    payLoad: {
      user,
    },
  });
});

const getUserByUid = tryCatch(async (req, res, next) => {
  const { uid } = req.params;

  if (!uid) {
    return next(new errorHandler("Please provide the uid", 400));
  }

  const getUser = await Users.findOne({ uid });
  if (!getUser) {
    return next(new errorHandler("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    payLoad: {
      user: getUser,
    },
  });
});

const forgotPassword = tryCatch(async (req, res, next) => {
  const { Email } = req.body;

  console.log(Email);

  if (!Email) {
    return next(new errorHandler("Please provide an email", 400));
  }

  const user = (await Users.findOne({ Email })) || (await Student.findOne({ Email }));

  if (!user) {
    return next(new errorHandler("There is no user with that email address", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.Email,
      subject: "Your password reset token (valid for 10 minutes)",
      message,
    });

    res.status(200).json({
      status: "success",
      token: resetToken,
      message: "Token sent to email!",
    });
  } catch (err) {
    user.PasswordResetToken = undefined;
    user.PasswordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new errorHandler("There was an error sending the email. Try again later!", 500));
  }
});

const resetPassword = tryCatch(async (req, res, next) => {
  const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user =
    (await Users.findOne({
      PasswordResetToken: hashedToken,
      PasswordResetExpires: { $gt: Date.now() },
    })) ||
    (await Student.findOne({
      PasswordResetToken: hashedToken,
      PasswordResetExpires: { $gt: Date.now() },
    }));

  if (!user) {
    return next(new errorHandler("Token is invalid or has expired", 400));
  }

  user.Password = req.body.Password;
  user.ConfirmPassword = req.body.ConfirmPassword;
  user.PasswordResetToken = undefined;
  user.PasswordResetExpires = undefined;
  await user.save();

  createAndSendToken(user, 200, res, false, "user");
});

const validatePasswordResetToken = tryCatch(async (req, res, next) => {
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user =
    (await Users.findOne({
      PasswordResetToken: hashedToken,
      PasswordResetExpires: { $gt: Date.now() },
    })) ||
    (await Student.findOne({
      PasswordResetToken: hashedToken,
      PasswordResetExpires: { $gt: Date.now() },
    }));

  if (!user) {
    return next(new errorHandler("Token is invalid or has expired", 400));
  }

  res.status(200).json({
    status: "success",
    message: "Token is valid",
  });
});

module.exports = {
  signUp,
  login,
  verifyEmail,
  redirect,
  getUserById,
  resendVerificationMail,
  getAllUsers,
  deletUser,
  getUserByUid,
  googleAuth,
  createAndSendToken,
  forgotPassword,
  resetPassword,
  validatePasswordResetToken,
};
