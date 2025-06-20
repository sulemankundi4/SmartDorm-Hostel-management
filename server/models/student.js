const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const studentSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required"],
    },
    Email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    Password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    ConfirmPassword: {
      type: String,
      required: [true, "Confirm Password is required"],
      validate: {
        validator: function (el) {
          return el === this.Password;
        },
        message: "Passwords does not match!",
      },
    },
    University: {
      type: String,
      validate: {
        validator: function (val) {
          return this.Role !== "student" || val !== undefined;
        },
        message: "University is required for student",
      },
    },
    Role: {
      type: String,
      default: "student",
    },
    IsEmailVerified: {
      type: Boolean,
      default: false,
    },
    EmailVerificationToken: {
      type: String,
    },
    EmailVerificationTokenExpires: {
      type: Date,
    },
    AccountStatus: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("Password") || this.Password === undefined) {
    return next();
  }

  this.Password = await bcrypt.hash(this.Password, 12);
  this.ConfirmPassword = undefined;
});

studentSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

studentSchema.methods.createEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.EmailVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
  this.EmailVerificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
  return verificationToken;
};

studentSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.PasswordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.PasswordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
