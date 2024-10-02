const express = require("express");
const { createNewListing, getAllListings, singleOwnerListing, verifyListing, singleListing, getAllVerifiedListings, searchHostelWithin, deleteListing, updateListing } = require("../controllers/hostelListing");
const { adminOnly } = require("../utils/features");

const router = express.Router();

router.get("/allListings", adminOnly, getAllListings);
router.get("/ownerListing", singleOwnerListing);
router.get("/getListing", adminOnly, singleListing);
router.get("/listingDetails", singleListing);
router.get("/getAllVerifiedListings", getAllVerifiedListings);

router.post("/addNew", createNewListing);
router.post("/deleteListing", deleteListing);
router.post("/getListingsWithin", searchHostelWithin);
router.post("/verifyListing", adminOnly, verifyListing);

router.patch("/updateListing/:id", updateListing);
//FOR DELETING LISTING
module.exports = router;
