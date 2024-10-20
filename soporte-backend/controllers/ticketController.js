const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
  try {
    const { asunto, descripcion, usuario } = req.body;
    const newTicket = new Ticket({ asunto, descripcion, usuario });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el ticket' });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const { agentId } = req.query;
    const tickets = await Ticket.find({ usuario: agentId });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tickets' });
  }
};
