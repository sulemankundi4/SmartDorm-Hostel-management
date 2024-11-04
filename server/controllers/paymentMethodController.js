const { tryCatch, errorHandler } = require("../utils/features");
const PaymentMethod = require("../models/paymentMethod");
const Bookings = require("../models/singleBedBooking");
const User = require("../models/user");

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

const getPaymentDetails = tryCatch(async (req, res, next) => {
  const bookings = await Bookings.find();
  const unpaidBookings = bookings.filter((booking) => !booking.IsPaidToOwner);
  let totalBookings = bookings.length;

  let AllTimePayment = bookings.reduce((acc, booking) => acc + booking.Amount, 0);
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

  const cardDetails = await PaymentMethod.findOne({ userId: ownerId });

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

  const bookings = await Bookings.find({ HostelOwnerName: ownerId });

  let totalPayment = bookings.reduce((acc, booking) => acc + booking.Amount, 0);
  let adminCommision = totalPayment * 0.1;

  totalPayment -= adminCommision;
  res.status(200).json({
    success: true,
    data: {
      totalPayment,
    },
  });
});

const sendPaymentToOwner = tryCatch(async (req, res, next) => {
  const { ownerId, amount } = req.body;

  if (!ownerId || !amount) {
    return next(new errorHandler("Please provide all required fields", 400));
  }

  // Deduct the amount from admin balance (assuming admin balance is stored somewhere)
  // For simplicity, let's assume admin balance is stored in a variable
  let adminBalance = 10000; // Example balance
  adminBalance -= amount;

  // Logic to send payment to the owner (e.g., using a payment gateway)

  res.status(200).json({
    success: true,
    message: "Payment sent successfully",
    adminBalance,
  });
});

const getOwnerPaymentDetails = tryCatch(async (req, res, next) => {
  const { ownerId } = req.query;

  if (!ownerId) {
    return next(new errorHandler("Please provide an owner ID", 400));
  }

  const bookings = await Bookings.find({ HostelOwnerName: ownerId });
  let NotPaidBookings = bookings.filter((booking) => !booking.IsPaidToOwner);

  let expectedPaymentToCome = NotPaidBookings.reduce((acc, booking) => acc + booking.Amount, 0);

  expectedPaymentToCome -= expectedPaymentToCome * 0.1;
  expectedPaymentToCome = (expectedPaymentToCome / 1000).toFixed(1);

  res.status(200).json({
    success: true,
    data: {
      expectedPaymentToCome,
    },
  });
});

module.exports = {
  addPaymentMethod,
  getPaymentMethods,
  getPaymentDetails,
  getHostelOwners,
  getOwnerCardDetails,
  sendPaymentToOwner,
  getOwnerTotalPayment,
  getOwnerPaymentDetails,
};
