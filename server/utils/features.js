const mongoose = require("mongoose");
const Users = require("../models/user");

class errorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const tryCatch = (ftn) => {
  return (req, res, next) => {
    return Promise.resolve(ftn(req, res, next)).catch(next);
  };
};

const adminOnly = tryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return next(new errorHandler("Please provide an id", 400));
  }

  const user = await Users.findById(id);

  if (!user) {
    return next(new errorHandler("User not found", 404));
  }

  if (user.Role !== "admin") {
    return next(new errorHandler("You are not authorized to perform this action", 403));
  }

  next();
});

module.exports = {
  errorHandler,
  tryCatch,
  adminOnly,
};
