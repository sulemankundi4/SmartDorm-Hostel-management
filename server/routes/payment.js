const express = require("express");
const { createPaymentIntent, createSingleRoomBooking } = require("../controllers/payment");
const router = express.Router();

router.post("/create-payment-intent", createPaymentIntent);
router.post("/create-new-single-booking", createSingleRoomBooking);

module.exports = router;
