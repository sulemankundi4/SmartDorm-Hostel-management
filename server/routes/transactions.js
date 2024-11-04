const express = require("express");
const { createTransaction, getOwnerPayments } = require("../controllers/transactions");

const router = express.Router();

router.post("/create", createTransaction);
router.get("/owner-payments", getOwnerPayments);

module.exports = router;
