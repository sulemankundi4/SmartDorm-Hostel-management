const mongoose = require("mongoose");

const userTicketsSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userSubject: {
    type: String,
    required: true,
  },
  userMessage: {
    type: String,
    required: true,
  },
  status: {
    enum: ["pending", "resolved"],
    type: String,
    default: "pending",
  },
});

const userTickets = mongoose.model("userTickets", userTicketsSchema);
module.exports = userTickets;
