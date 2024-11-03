const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: [true, "Please provide a card number"],
  },

  cardType: {
    type: String,
    required: [true, "Please provide a card type"],
  },
  userName: {
    type: String,
    required: [true, "Please provide a user name"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

module.exports = PaymentMethod;
