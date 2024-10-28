const express = require("express");
const { reviewHostel, getReviewsOfHostel } = require("../controllers/reviewsController");

const router = express.Router();

router.post("/add", reviewHostel);
router.get("/get-reviews", getReviewsOfHostel);

module.exports = router;
