const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const transactionSchema = mongoose.Schema(
  {
    ownerName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner Name is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },

    isRecieved: {
      type: Boolean,
      default: false,
    },

    transactionId: {
      type: String,
      required: [true, "Transaction ID is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
