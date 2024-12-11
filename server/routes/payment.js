const express = require("express");
const { createPaymentIntent, createSingleRoomBooking, createSeaterRoomBooking, getBookingDetails } = require("../controllers/payment");
const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);
router.post("/create-new-single-booking", createSingleRoomBooking);

router.post("/create-seater-room-booking", createSeaterRoomBooking);
router.post("/booking-details", getBookingDetails);

module.exports = router;
