const express = require("express");
const { studentSignUp } = require("../controllers/studentController");

const router = express.Router();

// POST routes
router.post("/signup-student", studentSignUp); // User signup

module.exports = router;
