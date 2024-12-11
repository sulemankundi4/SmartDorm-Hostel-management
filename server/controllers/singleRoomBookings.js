const { tryCatch, errorHandler } = require("../utils/features");
const SingleBedBooking = require("../models/singleBedBooking");
const { default: mongoose } = require("mongoose");
const Booking = require("../models/singleBedBooking");
const MultiSeaterBooking = require("../models/multiseaterBooking");

const getSingleRoomBookingsOfOwner = tryCatch(async (req, res, next) => {
  const { userId, isStudent } = req.query;

  const isStudentBool = isStudent === "true";

  if (!userId) {
    return next(new errorHandler("Hostel Owner ID is required", 400));
  }

  const bookings = await SingleBedBooking.find(isStudentBool ? { StudentName: userId } : { HostelOwnerName: userId, Status: "confirmed" })
    .populate("StudentName", "Name Email University")
    .populate("HostelName", "HostelName HostelAddress")
    .populate("HostelOwnerName", "Name Email");

  res.status(200).json({ success: true, bookings });
});

const verifySingleRoomBooking = tryCatch(async (req, res, next) => {
  const { bookingId } = req.body;

  const booking = await SingleBedBooking.findById(bookingId);

  if (!booking) {
    return next(new errorHandler("No booking found", 404));
  }

  booking.Status = "confirmed";
  await booking.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    data: booking,
  });
});

const getCommunityPageStatsUniversity = tryCatch(async (req, res, next) => {
  const { hostelId } = req.query;

  if (!hostelId) {
    return next(new errorHandler("Hostel ID is required", 400));
  }

  const bookings = await SingleBedBooking.aggregate([
    {
      $match: {
        HostelName: new mongoose.Types.ObjectId(hostelId),
      },
    },
    {
      $lookup: {
        from: "students", // Assuming the collection name for students is 'students'
        localField: "StudentName",
        foreignField: "_id",
        as: "studentDetails",
      },
    },
    { $unwind: "$studentDetails" },
    {
      $match: {
        "studentDetails.University": { $ne: null },
      },
    },
    {
      $group: {
        _id: "$studentDetails.University",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        university: "$_id",
        count: 1,
      },
    },
  ]);

  res.status(200).json({ success: true, data: bookings });
});

const validateExistingBooking = tryCatch(async (req, res, next) => {
  const { StudentName, CheckInDate, CheckOutDate } = req.body;

  const existingBooking = await Booking.find({
    StudentName,
    $or: [{ CheckInDate: { $lte: CheckOutDate, $gte: CheckInDate } }, { CheckOutDate: { $lte: CheckOutDate, $gte: CheckInDate } }, { CheckInDate: { $lte: CheckInDate }, CheckOutDate: { $gte: CheckOutDate } }],
  });

  const existingMultiseaterBooking = await MultiSeaterBooking.find({
    StudentName,
    $or: [{ CheckInDate: { $lte: CheckOutDate, $gte: CheckInDate } }, { CheckOutDate: { $lte: CheckOutDate, $gte: CheckInDate } }, { CheckInDate: { $lte: CheckInDate }, CheckOutDate: { $gte: CheckOutDate } }],
  });

  if (existingBooking.length > 0 || existingMultiseaterBooking.length > 0) {
    return next(new errorHandler("You already have a booking within these dates", 400));
  }

  res.status(200).json({
    success: true,
    message: "Booking is valid",
  });
});

const getAllBookings = tryCatch(async (req, res, next) => {
  const bookings = await SingleBedBooking.find().populate("StudentName", "Name Email University").populate("HostelName", "HostelName HostelAddress").populate("HostelOwnerName", "Name Email");

  res.status(200).json({ success: true, bookings });
});

const getAllMultiseaterBookings = tryCatch(async (req, res, next) => {
  const bookings = await MultiSeaterBooking.find().populate("StudentName", "Name Email University").populate("HostelName", "HostelName HostelAddress").populate("HostelOwnerName", "Name Email");

  res.status(200).json({ success: true, bookings });
});

module.exports = { getSingleRoomBookingsOfOwner, getAllMultiseaterBookings, validateExistingBooking, verifySingleRoomBooking, getCommunityPageStatsUniversity, getAllBookings };
