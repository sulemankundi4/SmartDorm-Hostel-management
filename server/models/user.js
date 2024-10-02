const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required"],
    },
    uid: {
      type: String,
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
    Role: {
      type: String,
      enum: ["user", "owner", "admin"],
      default: "user",
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("Password") || this.Password === undefined) {
    return next();
  }

  this.Password = await bcrypt.hash(this.Password, 12);
  this.ConfirmPassword = undefined;
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.EmailVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
  this.EmailVerificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
  return verificationToken;
};

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
