const express = require("express");
const { createUserTicket, getAllTickets, resolveTicket, getTicketsById } = require("../controllers/userTickets");

const router = express.Router();

router.get("/all", getAllTickets);
router.post("/create-ticket", createUserTicket);
router.post("/resolve-ticket/:id", resolveTicket);
router.get("/get-ticket/:id", getTicketsById);
module.exports = router;
