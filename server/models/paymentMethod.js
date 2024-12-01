const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema({
  methodType: {
    type: String,
    enum: ["Bank", "Easypaisa", "JazzCash"],
    required: [true, "Please select a payment method type"],
  },
  cardNumber: {
    type: String,
    required: function () {
      return this.methodType === "Bank";
    },
  },
  bankName: {
    type: String,
    required: function () {
      return this.methodType === "Bank";
    },
  },
  phoneNumber: {
    type: String,
    required: function () {
      return this.methodType === "Easypaisa" || this.methodType === "JazzCash";
    },
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
