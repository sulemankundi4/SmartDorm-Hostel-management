const express = require("express");
const { login, signUp, verifyEmail, googleAuth, redirect, getUserById, deletUser, getAllUsers, resendVerificationMail, getUserByUid, forgotPassword, resetPassword, validatePasswordResetToken } = require("../controllers/userController");
const { adminOnly } = require("../utils/features");

const router = express.Router();

// POST routes
router.post("/signup", signUp); // User signup
router.post("/login", login); // User login
router.post("/googleAuth", googleAuth); // Google auth
router.post("/resendEmail/:Email", resendVerificationMail); // Resend verification email
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

// GET routes
router.get("/allUsers", adminOnly, getAllUsers); // Get all users (admin only)
router.get("/uid/:uid", getUserByUid); // Google auth
router.get("/:id", getUserById).delete("/:id", adminOnly, deletUser); // Get user by id and delete user (admin only)
router.get("/verifyEmail/:token", verifyEmail, redirect); // Verify email and redirect
router.get("/validate-password-reset-token/:token", validatePasswordResetToken);

module.exports = router;
