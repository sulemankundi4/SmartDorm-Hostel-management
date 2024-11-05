const express = require("express");
const { createTransaction, getOwnerPayments, verifyPayment } = require("../controllers/transactions");

const router = express.Router();

router.post("/create", createTransaction);
router.get("/owner-payments", getOwnerPayments);

router.post("/verify-payment", verifyPayment);

module.exports = router;
