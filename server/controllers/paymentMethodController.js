const { tryCatch, errorHandler } = require("../utils/features");
const PaymentMethod = require("../models/paymentMethod");

const addPaymentMethod = tryCatch(async (req, res, next) => {
  const { cardNumber, cardType, userName, userId } = req.body;

  if (!cardNumber || !cardType || !userName || !userId) {
    return next(new errorHandler("Please provide all required fields", 400));
  }

  const GetPaymentMethods = await PaymentMethod.find({ userId });

  if (GetPaymentMethods.length > 1) {
    return next(new errorHandler("You can only have two payment method", 400));
  }

  const newPaymentMethod = await PaymentMethod.create({
    cardNumber,
    cardType,
    userName,
    userId,
  });

  res.status(201).json({
    success: true,
    data: newPaymentMethod,
  });
});

const getPaymentMethods = tryCatch(async (req, res, next) => {
  const { userId } = req.query;

  if (!userId) {
    return next(new errorHandler("Please provide a user ID", 400));
  }

  const paymentMethods = await PaymentMethod.find({ userId });

  res.status(200).json({
    success: true,
    data: paymentMethods,
  });
});

module.exports = {
  addPaymentMethod,
  getPaymentMethods,
};
