const mongoose = require("mongoose");

const singleBedBookingSchema = mongoose.Schema(
  {
    StudentName: {
      type: mongoose.Schema.ObjectId,
      ref: "Student",
    },

    HostelOwnerName: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },

    HostelName: {
      type: mongoose.Schema.ObjectId,
      ref: "Hostel",
    },

    CheckInDate: {
      type: Date,
      required: [true, "Check In Date is required"],
    },

    CheckOutDate: {
      type: Date,
      required: [true, "Check Out Date is required"],
    },

    Status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },

    Amount: {
      type: Number,
      required: true,
    },

    BookingDate: {
      type: Date,
      default: Date.now,
    },

    IsPaidToOwner: {
      type: Boolean,
      default: false,
    },
  },
  {
    timeStamps: true,
  }
);

const SingleBedBooking = mongoose.model("SingleBedBooking", singleBedBookingSchema);
module.exports = SingleBedBooking;
