const express = require("express");
const { getSingleRoomBookingsOfOwner, verifySingleRoomBooking, getAllMultiseaterBookings, getCommunityPageStatsUniversity, getAllBookings, validateExistingBooking } = require("../controllers/singleRoomBookings");
const { adminOnly } = require("../utils/features");

const router = express.Router();

router.get("/get-all-bookings", getSingleRoomBookingsOfOwner);
router.post("/verify-single-room-booking", verifySingleRoomBooking);
router.get("/get-community-stats", getCommunityPageStatsUniversity);
router.post("/check-existing-booking", validateExistingBooking);
router.get("/all-bookings", adminOnly, getAllBookings);
router.get("/all-multiseater-bookings", adminOnly, getAllMultiseaterBookings);

module.exports = router;
