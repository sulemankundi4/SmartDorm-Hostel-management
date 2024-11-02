const express = require("express");
const { getSingleRoomBookingsOfOwner, verifySingleRoomBooking, getCommunityPageStatsUniversity, validateExistingBooking } = require("../controllers/singleRoomBookings");
const router = express.Router();

router.get("/get-all-bookings", getSingleRoomBookingsOfOwner);
router.post("/verify-single-room-booking", verifySingleRoomBooking);
router.get("/get-community-stats", getCommunityPageStatsUniversity);
router.post("/check-existing-booking", validateExistingBooking);

module.exports = router;
