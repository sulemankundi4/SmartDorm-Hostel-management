const { tryCatch, errorHandler } = require("../utils/features");
const { stripe } = require("../utils/stripe");
const SingleBedBooking = require("../models/singleBedBooking");
const Hostel = require("../models/hostel");
const MultiSeaterRoomBooking = require("../models/multiseaterBooking");

const createPaymentIntent = tryCatch(async (req, res, next) => {
  const { amount } = req.body;

  if (!amount) {
    return next(new errorHandler("Please provide an amount", 400));
  }
  const paymentIntent = await stripe.paymentIntents.create({
    description: "Software development services",
    shipping: {
      name: "Jenny Rosen",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US",
      },
    },
    amount: amount * 100,
    currency: "pkr",
    payment_method_types: ["card"],
  });

  return res.status(200).json({
    success: true,
    paymentIntent,
    clientSecret: paymentIntent.client_secret,
  });
});

const createSingleRoomBooking = tryCatch(async (req, res, next) => {
  const { StudentName, HostelOwnerName, HostelName, CheckInDate, Amount } = req.body;

  if (!StudentName || !HostelOwnerName || !HostelName || !CheckInDate || !Amount) {
    return next(new errorHandler("Please provide all required fields", 400));
  }

  // checking if single rooms are available
  const rooms = await Hostel.findById(HostelName);

  if (rooms.SingleBedRooms < 1) {
    return next(new errorHandler("No single rooms available in this hostel", 400));
  }

  // Calculate CheckOutDate one month after CheckInDate
  const CheckOutDate = new Date(CheckInDate);
  CheckOutDate.setMonth(CheckOutDate.getMonth() + 1);

  console.log(CheckInDate, CheckOutDate);

  const newBooking = await SingleBedBooking.create({
    StudentName,
    HostelOwnerName,
    HostelName,
    CheckInDate,
    CheckOutDate,
    Amount,
  });

  // Reduce the number of beds in the hostel
  const hostel = await Hostel.findById(HostelName);
  hostel.SingleBedRooms -= 1;
  await hostel.save({ validateBeforeSave: false });

  return res.status(201).json({
    success: true,
    booking: newBooking,
  });
});

const createSeaterRoomBooking = tryCatch(async (req, res, next) => {
  const { StudentName, HostelOwnerName, HostelName, CheckInDate, Amount, RoomNumber, SeaterType, Count } = req.body;

  if (!StudentName || !HostelOwnerName || !HostelName || !CheckInDate || !Amount || !RoomNumber || !SeaterType || !Count) {
    return next(new errorHandler("Please provide all required fields", 400));
  }
  const hostel = await Hostel.findById(HostelName);

  const seaterRoom = hostel.SeaterRooms.find((room) => room.seaterType === parseInt(SeaterType));
  const seaterCount = hostel.SeaterRooms.find((roomCount) => roomCount.count === parseInt(Count));

  if (!seaterCount) {
    return next(new errorHandler("Seater room not found", 404));
  }

  const room = seaterCount.rooms.find((room) => room.roomNumber === RoomNumber);

  if (!room) {
    return next(new errorHandler("Room not found", 404));
  }

  if (!room.isAvailable) {
    return next(new errorHandler("Room is already booked", 400));
  }

  room.isAvailable = false;
  room.bookingId = StudentName;

  const CheckOutDate = new Date(CheckInDate);
  CheckOutDate.setMonth(CheckOutDate.getMonth() + 1);

  const newBooking = await MultiSeaterRoomBooking.create({
    StudentName,
    HostelOwnerName,
    HostelName,
    RoomNumber,
    SeaterType,
    CheckInDate,
    CheckOutDate,
    Count,
    Amount,
  });
  await newBooking.save();
  await hostel.save();

  return res.status(201).json({
    success: true,
    message: "Room booked successfully",
    booking: newBooking,
  });
});

const getBookingDetails = tryCatch(async (req, res, next) => {
  const { roomNumber } = req.body;

  const booking = await MultiSeaterRoomBooking.findOne({ RoomNumber: roomNumber }).populate("StudentName HostelOwnerName HostelName");

  if (!booking) {
    return next(new errorHandler("Booking not found", 404));
  }

  return res.status(200).json({
    success: true,
    booking,
  });
});

module.exports = { createPaymentIntent, createSingleRoomBooking, createSeaterRoomBooking, getBookingDetails };
