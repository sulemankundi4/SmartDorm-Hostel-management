const express = require("express");
const { createUserPreferences, getUserPreferences, updateUserPreferences, matchUserPreferences } = require("../controllers/userPreferences");
const router = express.Router();

router.post("/new", createUserPreferences);
router.get("/preferences/:userId", getUserPreferences);
router.put("/preferences/:userId", updateUserPreferences);
router.get("/match/:userId", matchUserPreferences);

module.exports = router;
