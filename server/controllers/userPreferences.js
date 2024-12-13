const UserPreferences = require("../models/preferences");
const { tryCatch, errorHandler } = require("../utils/features");

const createUserPreferences = tryCatch(async (req, res, next) => {
  const { userId, sleepingHabits, universityName, city, sharedExpense, smokingHabits } = req.body;
  if (!userId || !sleepingHabits || !city || sharedExpense === undefined || smokingHabits === undefined) {
    return next(new errorHandler("Please provide all required fields", 400));
  }

  const newUserPreferences = await UserPreferences.create({
    userId,
    universityName,
    sleepingHabits,
    city,
    sharedExpense,
    smokingHabits,
  });

  return res.status(201).json({
    success: true,
    message: "User preferences created successfully",
    data: newUserPreferences,
  });
});

const getUserPreferences = tryCatch(async (req, res, next) => {
  const { userId } = req.params;

  const userPreferences = await UserPreferences.findOne({ userId });

  if (!userPreferences) {
    return next(new errorHandler("User preferences not found", 404));
  }

  return res.status(200).json({
    success: true,
    data: userPreferences,
  });
});

const updateUserPreferences = tryCatch(async (req, res, next) => {
  const { userId, sleepingHabits, universityName, city, sharedExpense, smokingHabits } = req.body;
  if (!userId || !sleepingHabits || !city || sharedExpense === undefined || smokingHabits === undefined) {
    return next(new errorHandler("Please provide all required fields", 400));
  }

  const updatedPreferences = await UserPreferences.findOneAndUpdate({ userId }, { sleepingHabits, universityName, city, sharedExpense, smokingHabits }, { new: true });

  if (!updatedPreferences) {
    return next(new errorHandler("User preferences not found", 404));
  }

  return res.status(200).json({
    success: true,
    message: "User preferences updated successfully",
    data: updatedPreferences,
  });
});

module.exports = { createUserPreferences, getUserPreferences, updateUserPreferences };
