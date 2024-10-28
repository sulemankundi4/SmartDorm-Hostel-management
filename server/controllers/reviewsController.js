const { tryCatch, errorHandler } = require("../utils/features");
const Review = require("../models/reviews");

const reviewHostel = tryCatch(async (req, res, next) => {
  const { Ratings, UserName, HostelName, Description } = req.body;

  // Validate input
  if (!Ratings || !UserName || !HostelName || !Description) {
    return next(new errorHandler("Please provide all the required fields", 400));
  }

  // Create a new review
  const newReview = await Review.create({
    Ratings,
    UserName,
    HostelName,
    Description,
  });

  // Send response
  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});

const getReviewsOfHostel = tryCatch(async (req, res, next) => {
  const { hostelId } = req.query;

  if (!hostelId) {
    return next(new errorHandler("Please provide the hostel id", 400));
  }

  // Get all reviews of a hostel
  const reviews = await Review.find({ HostelName: hostelId }).populate("UserName", "Name Email");

  return res.status(200).json({
    status: "success",
    data: {
      reviews,
    },
  });
});

module.exports = {
  reviewHostel,
  getReviewsOfHostel,
};
