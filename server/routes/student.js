const express = require("express");
const { studentSignUp, getStudentById, studenLogin } = require("../controllers/studentController");

const router = express.Router();

// POST routes
router.post("/signup-student", studentSignUp); // User signup

module.exports = router;
