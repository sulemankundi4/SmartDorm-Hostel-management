const { tryCatch, errorHandler } = require("../utils/features");
const Transaction = require("../models/transactions");
const Bookings = require("../models/singleBedBooking");
const MultiSeaterBooking = require("../models/multiseaterBooking");

const createTransaction = tryCatch(async (req, res, next) => {
  const { ownerName, amount, transactionId, transactionImage } = req.body;

  if (!ownerName || !amount || !transactionId || !transactionImage) {
    return next(new errorHandler("Please provide all required fields", 400));
  }

  // Find all single room bookings for the specified owner
  const updatedSingleRoomPayments = await Bookings.find({ HostelOwnerName: ownerName });

  // Find all multi-seater bookings for the specified owner
  const updatedMultiSeaterPayments = await MultiSeaterBooking.find({ HostelOwnerName: ownerName });

  // Update the isPaidToOwner field to true for all single room bookings
  await Bookings.updateMany({ HostelOwnerName: ownerName }, { $set: { IsPaidToOwner: true } });

  // Update the isPaidToOwner field to true for all multi-seater bookings
  await MultiSeaterBooking.updateMany({ HostelOwnerName: ownerName }, { $set: { IsPaidToOwner: true } });

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

  // Find the transaction by transactionId and ownerId in both collections
  let transaction = await Transaction.findOne({ transactionId, ownerName: ownerId });
  let multiSeaterTransaction = await MultiSeaterTransaction.findOne({ transactionId, ownerName: ownerId });

  if (!transaction && !multiSeaterTransaction) {
    return next(new errorHandler("Transaction not found", 404));
  }

  // Update the isRecieved field to true
  if (transaction) {
    transaction.isRecieved = true;
    await transaction.save();
  } else if (multiSeaterTransaction) {
    multiSeaterTransaction.isRecieved = true;
    await multiSeaterTransaction.save();
  }

  res.status(200).json({
    success: true,
    message: "Payment verified successfully",
    data: transaction || multiSeaterTransaction,
  });
});

const getAllTransactions = tryCatch(async (req, res, next) => {
  const transactions = await Transaction.find().populate("ownerName", "Name Email");

  if (!transactions) {
    return next(new errorHandler("No transactions found", 404));
  }

  res.status(200).json({
    success: true,
    data: transactions,
  });
});

module.exports = {
  createTransaction,
  getOwnerPayments,
  verifyPayment,
  getAllTransactions,
};
