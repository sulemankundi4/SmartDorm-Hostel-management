const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: [true, "Please provide a account number"],
  },
  bankName: {
    type: String,
    required: [true, "Please provide a Bank Name"],
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
