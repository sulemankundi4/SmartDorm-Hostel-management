const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  bookingId: {
    type: mongoose.Schema.ObjectId,
    ref: "Booking",
    default: null,
  },
});

const seaterRoomSchema = new mongoose.Schema({
  seaterType: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  rooms: {
    type: [roomSchema],
    default: [],
  },
});

const hostelSchema = mongoose.Schema(
  {
    HostelName: {
      type: String,
      required: [true, "Hostel Name is required"],
    },
    HostelProvince: {
      type: String,
      required: [true, "Hostel Province is required"],
    },
    HostelCity: {
      type: String,
      required: [true, "Hostel City is required"],
    },
    HostelAddress: {
      type: String,
      required: [true, "Hostel Address is required"],
    },
    HostelAddressProof: {
      type: String,
      required: [true, "Hostel Address Proof is required"],
    },
    PropertyType: {
      type: String,
      required: [true, "Property Type is required"],
    },
    HostelImages: {
      type: Array,
      required: [true, "Hostel Images are required"],
    },
    Currency: {
      type: String,
      required: [true, "Currency is required"],
    },
    HostelDescription: {
      type: String,
      required: [true, "Hostel Description is required"],
    },
    ListingOwner: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
    HostelRent: {
      type: Number,
      required: [true, "Hostel Rent is required"],
    },

    SingleBedRooms: {
      type: Number,
      required: [true, "Single Bed Rooms are required"],
    },
    SeaterRooms: {
      type: [seaterRoomSchema],
      default: [],
    },
    FoodMenu: [
      {
        Day: {
          type: String,
          enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          required: [true, "The day is required"],
        },
        BreakFast: {
          type: String,
          required: [true, "Breakfast is required"],
        },
        Lunch: {
          type: String,
          required: [true, "Lunch is required"],
        },
        Dinner: {
          type: String,
          required: [true, "Dinner is required"],
        },
      },
    ],
    Status: {
      type: String,
      default: "Pending",
    },
    Location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    SelectedLocationName: {
      type: String,
      required: true,
    },

    Facilities: {
      FreeBreakfast: { type: Boolean, default: false },
      FreeParking: { type: Boolean, default: false },
      FreeCityMaps: { type: Boolean, default: false },
      FreeWifi: { type: Boolean, default: false },
      FreeInternetAccess: { type: Boolean, default: false },
      BicycleParking: { type: Boolean, default: false },
      AirportTransfers: { type: Boolean, default: false },
      LuggageStorage: { type: Boolean, default: false },
    },
  },
  {
    timeStamps: true,
  }
);
hostelSchema.index({ Location: "2dsphere" });

const Hostel = mongoose.model("Hostel", hostelSchema);
module.exports = Hostel;
