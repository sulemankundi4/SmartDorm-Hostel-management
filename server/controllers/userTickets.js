const userTickets = require("../models/userQuarries");
const { tryCatch } = require("../utils/features");

const createUserTicket = tryCatch(async (req, res) => {
  const { userName, userEmail, userSubject, userMessage } = req.body;

  if (!userName || !userEmail || !userSubject || !userMessage) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const ticket = await userTickets.create({
    userName,
    userEmail,
    userSubject,
    userMessage,
  });

  return res.status(201).json({
    success: true,
    data: ticket,
  });
});

const getTicketsById = tryCatch(async (req, res) => {
  const { id } = req.params;

  const ticket = await userTickets.findById(id);

  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: ticket,
  });
});

const getAllTickets = tryCatch(async (req, res) => {
  const tickets = await userTickets.find();

  return res.status(200).json({
    success: true,
    data: tickets,
  });
});

const resolveTicket = tryCatch(async (req, res) => {
  const { id } = req.params;
  const ticket = await userTickets.findById(id);
  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });
  }

  ticket.status = "resolved";
  await ticket.save();

  return res.status(200).json({
    success: true,
    data: ticket,
  });
});

module.exports = {
  createUserTicket,
  getTicketsById,
  getAllTickets,
  resolveTicket,
};
