const express = require("express");
const { reviewHostel, getReviewsOfHostel, hasUserReviewedHostel, getHostelRatings } = require("../controllers/reviewsController");

const router = express.Router();

router.post("/add", reviewHostel);
router.get("/get-reviews", getReviewsOfHostel);
router.get("/has-reviewed", hasUserReviewedHostel);
router.get("/hostel-ratings", getHostelRatings);

module.exports = router;
