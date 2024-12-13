const express = require("express");
const { createUserPreferences, getUserPreferences, updateUserPreferences } = require("../controllers/userPreferences");
const router = express.Router();

router.post("/new", createUserPreferences);
router.get("/preferences/:userId", getUserPreferences);
router.put("/preferences/:userId", updateUserPreferences);

module.exports = router;
