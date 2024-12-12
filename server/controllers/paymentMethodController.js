const { tryCatch, errorHandler } = require("../utils/features");
const PaymentMethod = require("../models/paymentMethod");
const Bookings = require("../models/singleBedBooking");
const User = require("../models/user");
const Transaction = require("../models/transactions");
const MultiSeaterBooking = require("../models/multiseaterBooking");

const addPaymentMethod = tryCatch(async (req, res, next) => {
  const { methodType, cardNumber, phoneNumber, bankName, userName, userId } = req.body;

  if (!methodType || !userName || !userId) {
    return next(new errorHandler("Please provide all required fields", 400));
  }

  if (methodType === "Bank" && (!cardNumber || !bankName)) {
    return next(new errorHandler("Please provide card number and bank name", 400));
  }

  if ((methodType === "Easypaisa" || methodType === "JazzCash") && !phoneNumber) {
    return next(new errorHandler("Please provide phone number", 400));
  }

  const newPaymentMethod = await PaymentMethod.create({
    methodType,
    cardNumber,
    bankName,
    phoneNumber,
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

const getPaymentDetails = tryCatch(async (req, res, next) => {
  const singleRoomBookings = await Bookings.find();
  const multiSeaterBookings = await MultiSeaterBooking.find();

  const allBookings = [...singleRoomBookings, ...multiSeaterBookings];
  const unpaidBookings = allBookings.filter((booking) => !booking.IsPaidToOwner);
  let totalBookings = allBookings.length;

  let AllTimePayment = allBookings.reduce((acc, booking) => acc + booking.Amount, 0);
  let AllTimeAdminCommission = AllTimePayment * 0.1;

  let unpaidPayment = unpaidBookings.reduce((acc, booking) => acc + booking.Amount, 0);
  let unpaidAdminCommission = unpaidPayment * 0.1;

  // Converting total payment and commission to k with precision
  AllTimePayment = (AllTimePayment / 1000).toFixed(1);
  AllTimeAdminCommission = (AllTimeAdminCommission / 1000).toFixed(1);
  unpaidPayment = (unpaidPayment / 1000).toFixed(1);
  unpaidAdminCommission = (unpaidAdminCommission / 1000).toFixed(1);

  res.status(200).json({
    success: true,
    data: {
      AllTimePayment,
      AllTimeAdminCommission,
      totalBookings,
      unpaidPayment,
      unpaidAdminCommission,
    },
  });
});

const getHostelOwners = tryCatch(async (req, res, next) => {
  const owners = await User.find({ Role: "owner" }).select("Name Email");

  res.status(200).json({
    success: true,
    data: owners,
  });
});

const getOwnerCardDetails = tryCatch(async (req, res, next) => {
  const { ownerId } = req.query;

  if (!ownerId) {
    return next(new errorHandler("Please provide an owner ID", 400));
  }

  const cardDetails = await PaymentMethod.find({ userId: ownerId });

  res.status(200).json({
    success: true,
    data: cardDetails,
  });
});

const getOwnerTotalPayment = tryCatch(async (req, res, next) => {
  const { ownerId } = req.query;

  if (!ownerId) {
    return next(new errorHandler("Please provide an owner ID", 400));
  }

  const singleRoomBookings = await Bookings.find({ HostelOwnerName: ownerId });
  const multiSeaterBookings = await MultiSeaterBooking.find({ HostelOwnerName: ownerId });

  const allBookings = [...singleRoomBookings, ...multiSeaterBookings];
  const unpaidBookings = allBookings.filter((booking) => !booking.IsPaidToOwner);

  let totalPayment = unpaidBookings.reduce((acc, booking) => acc + booking.Amount, 0);
  let adminCommision = totalPayment * 0.1;

  totalPayment -= adminCommision;
  res.status(200).json({
    success: true,
    data: {
      totalPayment,
    },
  });
});

const getOwnerPaymentDetails = tryCatch(async (req, res, next) => {
  const { ownerId } = req.query;

  if (!ownerId) {
    return next(new errorHandler("Please provide an owner ID", 400));
  }

  const singleRoomBookings = await Bookings.find({ HostelOwnerName: ownerId });
  const multiSeaterBookings = await MultiSeaterBooking.find({ HostelOwnerName: ownerId });

  const allBookings = [...singleRoomBookings, ...multiSeaterBookings];
  const NotPaidBookings = allBookings.filter((booking) => !booking.IsPaidToOwner);

  let expectedPaymentToCome = NotPaidBookings.reduce((acc, booking) => acc + booking.Amount, 0);

  expectedPaymentToCome -= expectedPaymentToCome * 0.1;
  expectedPaymentToCome = (expectedPaymentToCome / 1000).toFixed(1);

  const totalTransactions = await Transaction.find({ ownerName: ownerId });
  let totalPaymentRecived = totalTransactions.reduce((acc, payment) => acc + payment.amount, 0);

  totalPaymentRecived = (totalPaymentRecived / 1000).toFixed(1);
  res.status(200).json({
    success: true,
    data: {
      expectedPaymentToCome,
      totalPaymentRecived,
    },
  });
});

module.exports = {
  addPaymentMethod,
  getPaymentMethods,
  getPaymentDetails,
  getHostelOwners,
  getOwnerCardDetails,
  getOwnerTotalPayment,
  getOwnerPaymentDetails,
};
