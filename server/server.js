const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { config } = require("dotenv");

// Load environment variables first
config({
  path: "../.env",
});

const { errorMiddleware } = require("./middleware/error");
const { default: mongoose } = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

const corsOptions = {
  origin: "https://smart-dorm-hostel-management-c3av.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "SmartDorm Backend API is running",
    timestamp: new Date().toISOString(),
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

// Import routes
const userRouter = require("./routes/user");
const listingRouter = require("./routes/listing");
const userTicketsRouter = require("./routes/tickets");
const studentsRouter = require("./routes/student");
const paymentRouter = require("./routes/payment");
const singleRoomBookings = require("./routes/singleRoomBooking");
const hostelReviews = require("./routes/reviews");
const paymentMethodRoutes = require("./routes/paymentMethods");
const transactionRoutes = require("./routes/transactions");
const userPreferencesRoutes = require("./routes/preference");

// API Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/listings", listingRouter);
app.use("/api/v1/tickets", userTicketsRouter);
app.use("/api/v1/students", studentsRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/single-room-booking", singleRoomBookings);
app.use("/api/v1/reviews", hostelReviews);
app.use("/api/v1/payment-method", paymentMethodRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/preferences", userPreferencesRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Handle 404 routes
app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
    path: req.originalUrl,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

module.exports = app; // Export for Vercel
