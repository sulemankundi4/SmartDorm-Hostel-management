const express = require("express");
const { addPaymentMethod, getPaymentMethods, getPaymentDetails } = require("../controllers/paymentMethodController");
const { adminOnly } = require("../utils/features");

const router = express.Router();

router.post("/add", addPaymentMethod);
router.get("/", getPaymentMethods);
router.get("/details", adminOnly, getPaymentDetails);

module.exports = router;
