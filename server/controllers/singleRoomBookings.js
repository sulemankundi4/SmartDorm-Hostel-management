const { tryCatch, errorHandler } = require("../utils/features");
const SingleBedBooking = require("../models/singleBedBooking");

const getSingleRoomBookingsOfOwner = tryCatch(async (req, res, next) => {
  const { userId, isStudent } = req.query;

  const isStudentBool = isStudent === "true";

  if (!userId) {
    return next(new errorHandler("Hostel Owner ID is required", 400));
  }

  const bookings = await SingleBedBooking.find(isStudentBool ? { StudentName: userId } : { HostelOwnerName: userId })
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

module.exports = { getSingleRoomBookingsOfOwner, verifySingleRoomBooking };
