const Users = require("../models/user");
const { tryCatch, errorHandler } = require("../utils/features");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/email");
const juice = require("juice");
const { css, generateEmailTemplate } = require("../utils/confirmEmailTemplate");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user, statusCode, res, isEmailConfirming) => {
  const token = signToken(user._id);

  const cookiesOption = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
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

    createAndSendToken(user, 200, res, false);

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

  const user = await Users.findOne({ Email }).select("+Password");

  if (!user || !(await user.correctPassword(Password, user.Password))) {
    return next(new errorHandler("Incorrect email or password", 401));
  }

  createAndSendToken(user, 200, res, false);
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
  createAndSendToken(user, 200, res, true);
  next();
});

const redirect = tryCatch(async (req, res, next) => {
  res.redirect(`http://localhost:5173/emailVerified`);
});

const getUserById = tryCatch(async (req, res, next) => {
  const user = await Users.findById(req.params.id);

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
  const users = await Users.find({ AccountStatus: true });

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
    createAndSendToken(userAlreadyExists, 200, res, false);
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
  createAndSendToken(user, 200, res, false);

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
};
