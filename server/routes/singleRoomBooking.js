const express = require("express");
const { getSingleRoomBookingsOfOwner, verifySingleRoomBooking } = require("../controllers/singleRoomBookings");
const router = express.Router();

router.get("/get-all-bookings", getSingleRoomBookingsOfOwner);
router.post("/verify-single-room-booking", verifySingleRoomBooking);

module.exports = router;
