const mongoose = require("mongoose");

const userPreferencesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "Student",
    required: true,
  },
  universityName: {
    type: String,
    default: null,
  },
  sleepingHabits: {
    type: String,
    enum: ["Usually sleeps before 10 PM", "Stays up past midnight regularly", "Sleeps between 10 PM and midnight"],
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  sharedExpense: {
    type: Boolean,
    required: true,
  },
  smokingHabits: {
    type: Boolean,
    required: true,
  },
});

const UserPreferences = mongoose.model("UserPreferences", userPreferencesSchema);
module.exports = UserPreferences;
