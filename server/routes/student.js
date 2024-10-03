const express = require("express");
const { studentSignUp, getStudentById, studenLogin } = require("../controllers/studentController");

const router = express.Router();

// POST routes
router.post("/signup-student", studentSignUp); // User signup
router.get("/:id", getStudentById);
router.post("/login", studenLogin); // User login

module.exports = router;
