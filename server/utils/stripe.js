const Stripe = require("stripe");
const dotenv = require("dotenv");
dotenv.config();

const stripe_key = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripe_key);
module.exports = {
  stripe: stripe,
};
