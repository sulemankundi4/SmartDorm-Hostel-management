module.exports.errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Something went wrong!";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CastError") err.message = "Invalid ID";

  // Handle duplicate key error
  if (err.code === 11000 || err.code === 11001) {
    err.message = "Email already taken";
    err.statusCode = 400; // Bad Request
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

module.exports.tryCatch = (ftn) => {
  return (req, res, next) => {
    return Promise.resolve(ftn(req, res, next)).catch(next);
  };
};
