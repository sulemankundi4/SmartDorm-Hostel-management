const express = require("express");
const { addPaymentMethod, getOwnerTotalPayment, getOwnerPaymentDetails, getPaymentMethods, sendPaymentToOwner, getOwnerCardDetails, getHostelOwners, getPaymentDetails } = require("../controllers/paymentMethodController");
const { adminOnly } = require("../utils/features");

const router = express.Router();

router.post("/add", addPaymentMethod);
router.get("/", getPaymentMethods);
router.get("/details", adminOnly, getPaymentDetails);
router.get("/owners", adminOnly, getHostelOwners);
router.get("/owner-card-details", adminOnly, getOwnerCardDetails);
router.get("/owner-total-payment", adminOnly, getOwnerTotalPayment);
router.post("/send-payment", adminOnly, sendPaymentToOwner);
router.get("/owner-expected-payment", getOwnerPaymentDetails);

module.exports = router;
