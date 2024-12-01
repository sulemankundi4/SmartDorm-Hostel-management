const { tryCatch, errorHandler } = require("../utils/features");
const Transaction = require("../models/transactions");
const Bookings = require("../models/singleBedBooking");

const createTransaction = tryCatch(async (req, res, next) => {
  const { ownerName, amount, transactionId, transactionImage } = req.body;

  if (!ownerName || !amount || !transactionId || !transactionImage) {
    return next(new errorHandler("Please provide all required fields", 400));
  }

  // Find all bookings for the specified owner
  const updatedPayments = await Bookings.find({ HostelOwnerName: ownerName });

  // Update the isPaidToOwner field to true for all bookings
  await Bookings.updateMany({ HostelOwnerName: ownerName }, { $set: { IsPaidToOwner: true } });

  // Create a new transaction
  const newTransaction = await Transaction.create({
    ownerName,
    amount,
    transactionId,
    transactionImage,
  });

  res.status(201).json({
    success: true,
    data: newTransaction,
  });
});

const getOwnerPayments = tryCatch(async (req, res, next) => {
  const { ownerId } = req.query;

  if (!ownerId) {
    return next(new errorHandler("Please provide an owner ID", 400));
  }

  const payments = await Transaction.find({ ownerName: ownerId });

  res.status(200).json({
    success: true,
    data: payments,
  });
});

const verifyPayment = tryCatch(async (req, res, next) => {
  const { transactionId, ownerId } = req.body;

  if (!transactionId || !ownerId) {
    return next(new errorHandler("Please provide all required fields", 400));
  }

  // Find the transaction by transactionId and ownerId
  const transaction = await Transaction.findOne({ transactionId, ownerName: ownerId });

  if (!transaction) {
    return next(new errorHandler("Transaction not found", 404));
  }

  // Update the isRecieved field to true
  transaction.isRecieved = true;
  await transaction.save();

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
    data: transaction,
  });
});

module.exports = {
  createTransaction,
  getOwnerPayments,
  verifyPayment,
};
