const { tryCatch, errorHandler } = require("../utils/features");
const { stripe } = require("../utils/stripe");
const SingleBedBooking = require("../models/singleBedBooking");
const Hostel = require("../models/hostel");
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

module.exports = { createPaymentIntent, createSingleRoomBooking };
