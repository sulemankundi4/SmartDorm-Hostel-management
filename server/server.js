const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectDB } = require("./utils/features");
const { config } = require("dotenv");

const { errorMiddleware } = require("./middleware/error");

const userRouter = require("./routes/user");
const listingRouter = require("./routes/listing");
const userTicketsRouter = require("./routes/tickets");
const studentsRouter = require("./routes/student");
const paymentRouter = require("./routes/payment");
const singleRoomBookings = require("./routes/singleRoomBooking");
const hostelReviews = require("./routes/reviews");
const { reviewHostel } = require("./controllers/reviewsController");
const app = express();

app.use(express.json());
app.use(morgan("dev"));

const corsOptions = {
  origin: "http://localhost:5173", // replace with your client's origin
  credentials: true, // this allows the cookie to be sent with the request
};

app.use(cors(corsOptions));

config({
  path: "./.env",
});

connectDB();
const port = process.env.PORT || 5000;

app.use("/api/v1/users", userRouter);
app.use("/api/v1/listings", listingRouter);
app.use("/api/v1/tickets", userTicketsRouter);
app.use("/api/v1/students", studentsRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/single-room-booking", singleRoomBookings);
app.use("/api/v1/reviews", reviewHostel);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

app.use(errorMiddleware);
