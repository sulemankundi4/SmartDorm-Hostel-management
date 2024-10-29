const express = require("express");
const { reviewHostel, getReviewsOfHostel, hasUserReviewedHostel } = require("../controllers/reviewsController");

const router = express.Router();

router.post("/add", reviewHostel);
router.get("/get-reviews", getReviewsOfHostel);
router.get("/has-reviewed", hasUserReviewedHostel);

module.exports = router;
