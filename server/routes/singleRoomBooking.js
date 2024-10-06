const express = require("express");
const { getSingleRoomBookingsOfOwner, verifySingleRoomBooking, getCommunityPageStatsUniversity } = require("../controllers/singleRoomBookings");
const router = express.Router();

router.get("/get-all-bookings", getSingleRoomBookingsOfOwner);
router.post("/verify-single-room-booking", verifySingleRoomBooking);
router.get("/get-community-stats", getCommunityPageStatsUniversity);

module.exports = router;
