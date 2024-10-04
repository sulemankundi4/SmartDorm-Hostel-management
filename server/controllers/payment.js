const { tryCatch, errorHandler } = require("../utils/features");
const { stripe } = require("../utils/stripe");
const SingleBedBooking = require("../models/singleBedBooking");
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
  const { StudentName, HostelOwnerName, HostelName, CheckInDate, CheckOutDate, Amount } = req.body;

  if (!StudentName || !HostelOwnerName || !HostelName || !CheckInDate || !CheckOutDate || !Amount) {
    return next(new errorHandler("Please provide all required fields", 400));
  }

  const newBooking = await SingleBedBooking.create({
    StudentName,
    HostelOwnerName,
    HostelName,
    CheckInDate,
    CheckOutDate,
    Amount,
  });

  return res.status(201).json({
    success: true,
    booking: newBooking,
  });
});

module.exports = { createPaymentIntent, createSingleRoomBooking };
