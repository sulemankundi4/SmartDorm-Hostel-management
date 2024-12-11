const mongoose = require("mongoose");

const multiSeaterRoomBookingSchema = mongoose.Schema(
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
    RoomNumber: {
      type: String,
      required: [true, "The room number is reqiured"],
    },
    SeaterType: {
      type: Number,
      required: true,
    },
    Count: {
      type: Number,
      required: [true, "The count is required"],
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
    timestamps: true,
  }
);

const MultiSeaterRoomBooking = mongoose.model("MultiSeaterRoomBooking", multiSeaterRoomBookingSchema);
module.exports = MultiSeaterRoomBooking;
