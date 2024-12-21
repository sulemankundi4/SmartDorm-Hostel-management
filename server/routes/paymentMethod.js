const express = require("express");
const { addPaymentMethod, getPaymentMethods, getPaymentDetails, getHostelOwners, getOwnerCardDetails, getOwnerTotalPayment, getOwnerPaymentDetails, deletePaymentMethod } = require("../controllers/paymentMethodController");

const router = express.Router();

router.post("/add", addPaymentMethod);
router.get("/", getPaymentMethods);
router.get("/details", getPaymentDetails);
router.get("/owners", getHostelOwners);
router.get("/owner-card-details", getOwnerCardDetails);
router.get("/owner-total-payment", getOwnerTotalPayment);
router.get("/owner-expected-payment", getOwnerPaymentDetails);

module.exports = router;
