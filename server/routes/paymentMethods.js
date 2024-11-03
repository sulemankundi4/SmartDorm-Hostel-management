const express = require("express");
const { addPaymentMethod, getPaymentMethods } = require("../controllers/paymentMethodController");

const router = express.Router();

router.post("/add", addPaymentMethod);
router.get("/", getPaymentMethods);

module.exports = router;
