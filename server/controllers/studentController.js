const Student = require("../models/student");
const { tryCatch, errorHandler } = require("../utils/features");
const crypto = require("crypto");
const sendEmail = require("../utils/email");
const juice = require("juice");
const { css, generateEmailTemplate } = require("../utils/confirmEmailTemplate");
const { createAndSendToken } = require("./userController");
const Users = require("../models/user");

const studentSignUp = tryCatch(async (req, res, next) => {
  const { Name, Email, Password, ConfirmPassword, University, Role } = req.body;

  if (!Name || !Email || !Password || !ConfirmPassword || !Role) {
    return next(new errorHandler("Please provide all the required fields", 400));
  }

  if (Role === "student" && !University) {
    return next(new errorHandler("Please provide the university for student role", 400));
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

  const user = await Student.create({
    Name,
    Email,
    Password,
    ConfirmPassword,
    University: Role === "student" ? University : undefined,
    Role,
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

    createAndSendToken(user, 200, res, false, Role);

    return res.status(200).json({
      status: "success",
      message: "Email has been sent to the user",
    });
  } catch (e) {
    return next(new errorHandler("Email could not be sent", 500));
  }
});

module.exports = {
  studentSignUp,
};
