const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    UserName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: [true, "The Reviewer name is required!"],
    },
    Ratings: {
      type: Number,
      required: [true, "The rating is required!"],
      min: 1,
      max: 5,
    },
    Description: {
      type: String,
      required: [true, "The review description is required!"],
    },
    HostelName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: [true, "The hostel name is required!"],
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
