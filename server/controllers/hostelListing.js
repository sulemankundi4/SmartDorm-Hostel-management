const { tryCatch, errorHandler } = require("../utils/features");
const Hostel = require("../models/hostel");
const { v4: uuidv4 } = require("uuid");

const createNewListing = tryCatch(async (req, res, next) => {
  const { HostelName, HostelProvince, SelectedLocationName, SingleBedRooms, SeaterRooms, Location, HostelDescription, HostelImages, FoodMenu, HostelCity, HostelAddress, PropertyType, Currency, HostelRent, HostelAddressProof, ListingOwner, Facilities } = req.body;
  if (!HostelAddress || !HostelCity || !Location || !SelectedLocationName || !SingleBedRooms || !HostelDescription || !HostelName || !FoodMenu || !HostelProvince || !Currency || !HostelImages || !HostelRent || !HostelAddressProof || !Facilities || !ListingOwner) {
    return next(new errorHandler("Please fill in all the fields", 400));
  }

  console.log(req.body);

  const newHostel = await Hostel.create({
    HostelName,
    HostelProvince,
    HostelCity,
    HostelAddress,
    Currency,
    SelectedLocationName,
    PropertyType,
    HostelAddressProof,
    SingleBedRooms,
    SeaterRooms: SeaterRooms || [],
    ListingOwner,
    HostelDescription,
    HostelRent,
    FoodMenu,
    Location,
    HostelImages,
    Facilities,
  });

  return res.status(201).json({
    success: true,
    payLoad: newHostel,
  });
});
const updateListing = tryCatch(async (req, res, next) => {
  const updateHostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    validateBeforeSave: false,
  });

  return res.status(200).json({
    success: true,
    payLoad: updateHostel,
  });
});

const getAllListings = tryCatch(async (req, res, next) => {
  const allListings = await Hostel.find({});

  if (!allListings) {
    return next(new errorHandler("No listings found", 404));
  }

  return res.status(200).json({
    success: true,
    payLoad: allListings,
  });
});

const singleOwnerListing = tryCatch(async (req, res, next) => {
  const { id } = req.query;

  const ownerListings = await Hostel.find({ ListingOwner: id }).populate("ListingOwner", "Name Email");

  return res.status(200).json({
    success: true,
    payLoad: ownerListings,
  });
});

const verifyListing = tryCatch(async (req, res, next) => {
  const { listingId } = req.body;
  const Listing = await Hostel.findById(listingId);
  if (!Listing) {
    return next(new errorHandler("No listing found", 404));
  }

  Listing.Status = "Verified";
  await Listing.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    payLoad: Listing,
  });
});

const singleListing = tryCatch(async (req, res, next) => {
  const { listingId } = req.query;
  const listing = await Hostel.findById(listingId).populate("ListingOwner", "Name Email");

  if (!listing) {
    return next(new errorHandler("No listing found", 404));
  }

  return res.status(200).json({
    success: true,
    payLoad: listing,
  });
});

const getAllVerifiedListings = tryCatch(async (req, res, next) => {
  const verifiedListings = await Hostel.find({ Status: "Verified" });

  if (!verifiedListings) {
    return next(new errorHandler("No verified listings found", 404));
  }

  return res.status(200).json({
    success: true,
    payLoad: verifiedListings,
  });
});

const searchHostelWithin = tryCatch(async (req, res, next) => {
  const { distance, Lat, Lon } = req.body;
  if (!distance || !Lat || !Lon) {
    return next(new errorHandler("Please provide all the required fields", 400));
  }

  const radius = distance / 6378.1;

  const hostels = await Hostel.find({
    Location: {
      $geoWithin: {
        $centerSphere: [
          [Lon * 1, Lat * 1],
          radius, // Convert distance to radians by dividing by the Earth's radius in km
        ],
      },
    },
    Status: "Verified",
  });

  return res.status(200).json({
    success: true,
    payLoad: hostels,
  });
});

const deleteListing = tryCatch(async (req, res, next) => {
  const { listingId } = req.body;

  const listing = await Hostel.findByIdAndDelete(listingId);

  if (!listing) {
    return next(new errorHandler("No listing found", 404));
  }

  return res.status(200).json({
    success: true,
    payLoad: {},
  });
});

module.exports = {
  singleListing,
  updateListing,
  deleteListing,
  verifyListing,
  searchHostelWithin,
  getAllVerifiedListings,
  singleOwnerListing,
  createNewListing,
  getAllListings,
};
