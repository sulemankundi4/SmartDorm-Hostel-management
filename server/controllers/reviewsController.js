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

const hasUserReviewedHostel = tryCatch(async (req, res, next) => {
  const { userId, hostelId } = req.query;
  console.log(userId, hostelId);
  if (!userId || !hostelId) {
    return next(new errorHandler("Please provide both user ID and hostel ID", 400));
  }

  // Check if the user has reviewed the hostel
  const review = await Review.findOne({ UserName: userId, HostelName: hostelId });
  console.log(review);

  return res.status(200).json({
    status: "success",
    data: {
      userReview: review,
      hasReviewed: !!review,
    },
  });
});

const getHostelRatings = tryCatch(async (req, res, next) => {
  const ratings = await Review.aggregate([
    {
      $group: {
        _id: "$HostelName",
        averageRating: { $avg: "$Ratings" },
        totalReviews: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        hostelId: "$_id",
        averageRating: { $round: ["$averageRating", 1] },
        totalReviews: 1,
        roundedRating: { $round: ["$averageRating", 0] },
      },
    },
  ]);

  return res.status(200).json({
    status: "success",
    data: ratings,
  });
});

module.exports = {
  reviewHostel,
  getHostelRatings,
  getReviewsOfHostel,
  hasUserReviewedHostel,
};
