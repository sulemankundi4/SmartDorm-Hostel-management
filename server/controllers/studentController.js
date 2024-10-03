const Student = require("../models/student");
const { tryCatch, errorHandler } = require("../utils/features");
const crypto = require("crypto");
const sendEmail = require("../utils/email");
const juice = require("juice");
const { css, generateEmailTemplate } = require("../utils/confirmEmailTemplate");
const { createAndSendToken } = require("./userController");

const studentSignUp = tryCatch(async (req, res, next) => {
  const { Name, Email, Password, ConfirmPassword, University } = req.body;

  if (!Name || !Email || !Password || !ConfirmPassword || !University) {
    return next(new errorHandler("Please provide all the required fields", 400));
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const token = crypto.createHash("sha256").update(verificationToken).digest("hex");
  const tokenExpire = Date.now() + 24 * 60 * 60 * 1000;

  const user = await Student.create({
    Name,
    Email,
    Password,
    ConfirmPassword,
    University,
    EmailVerificationToken: token,
    EmailVerificationTokenExpires: tokenExpire,
  });
  const verificatonLink = `${req.protocol}://${req.get("host")}/api/v1/users/verifyEmail/${verificationToken}`;
  const html = generateEmailTemplate(verificatonLink, user);
  const message = juice.inlineContent(html, css);

  try {
    await sendEmail({
      email: user.Email,
      subject: "Email Verification Token valid for 24 Hours",
      message,
    });

    createAndSendToken(user, 200, res, false, "student");

    return res.status(200).json({
      status: "success",
      message: "Email has been sent to the user",
    });
  } catch (e) {
    return next(new errorHandler("Email could not be sent", 500));
  }
});

const getStudentById = tryCatch(async (req, res, next) => {
  const user = await Student.findById(req.params.id);

  if (!user) {
    return next(new errorHandler("Student not found", 404));
  }

  res.status(200).json({
    status: "success",
    payLoad: {
      user,
    },
  });
});

const studenLogin = tryCatch(async (req, res, next) => {
  const { Email, Password } = req.body;
  if (!Email || !Password) {
    return next(new errorHandler("Please provide email and password", 400));
  }

  const user = await Student.findOne({ Email }).select("+Password");

  if (!user || !(await user.correctPassword(Password, user.Password))) {
    return next(new errorHandler("Incorrect email or password", 401));
  }

  createAndSendToken(user, 200, res, false, "student");
});

module.exports = {
  studentSignUp,
  studenLogin,
  getStudentById,
};
