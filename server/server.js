const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { config } = require("dotenv");

// Load environment variables first
config({
  path: "../.env", // Fixed the path to point to .env in root directory
});

const { errorMiddleware } = require("./middleware/error");

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
const { default: mongoose } = require("mongoose");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const corsOptions = {
  origin: ["https://smart-dorm-hostel-management-c3av.vercel.app", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
const port = process.env.PORT || 5000;
console.log(process.env.MONGO_URI);
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

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

app.get("/", (req, res) => {
  res.send("backedn is running");
});

app.use(errorMiddleware);
