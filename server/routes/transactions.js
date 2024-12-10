const express = require("express");
const { createTransaction, getOwnerPayments, getAllTransactions, verifyPayment } = require("../controllers/transactions");

const router = express.Router();

router.post("/create", createTransaction);
router.get("/owner-payments", getOwnerPayments);

router.post("/verify-payment", verifyPayment);
router.get("/all-transactions", getAllTransactions);

module.exports = router;
