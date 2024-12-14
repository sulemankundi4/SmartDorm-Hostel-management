const UserPreferences = require("../models/preferences");
const MultiSeaterRoomBooking = require("../models/multiseaterBooking");
const Student = require("../models/student"); // Assuming you have a Student model to get student details
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

const matchUserPreferences = tryCatch(async (req, res, next) => {
  const { userId } = req.params;
  const userPreferences = await UserPreferences.findOne({ userId });

  if (!userPreferences) {
    return next(new errorHandler("User preferences not found", 404));
  }

  const allPreferences = await UserPreferences.find({ userId: { $ne: userId } });
  const matchedUsers = [];

  for (const prefs of allPreferences) {
    const roomBooking = await MultiSeaterRoomBooking.findOne({ StudentName: prefs.userId });

    if (roomBooking) {
      const student = await Student.findOne({ _id: prefs.userId }); // Fetch student details
      console.log(student);
      let matchCount = 0;
      if (prefs.sleepingHabits === userPreferences.sleepingHabits) matchCount++;
      if (prefs.universityName === userPreferences.universityName) matchCount++;
      if (prefs.city === userPreferences.city) matchCount++;
      if (prefs.sharedExpense === userPreferences.sharedExpense) matchCount++;
      if (prefs.smokingHabits === userPreferences.smokingHabits) matchCount++;

      const matchPercentage = (matchCount / 5) * 100;
      matchedUsers.push({
        userId: prefs.userId,
        name: student ? student.Name : "Unknown",
        matchPercentage,
        preferences: prefs,
      });
    }
  }

  return res.status(200).json({
    success: true,
    data: matchedUsers,
  });
});

module.exports = { createUserPreferences, getUserPreferences, updateUserPreferences, matchUserPreferences };
