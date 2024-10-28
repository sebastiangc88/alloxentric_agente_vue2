const Ticket = require('../models/Ticket');

// Crear un ticket
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

// Obtener todos los tickets
exports.getTickets = async (req, res) => {
  try {
    const { agentId } = req.query;
    const tickets = await Ticket.find({ usuario: agentId });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tickets' });
  }
};

// Obtener un ticket por ID
exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el ticket' });
  }
};

// Actualizar un ticket por ID
exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { asunto, descripcion, estado } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(id, { asunto, descripcion, estado }, { new: true });
    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el ticket' });
  }
};

// Eliminar un ticket por ID
exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      return res.status(404).json({ message: 'Ticket no encontrado' });
    }
    res.status(200).json({ message: 'Ticket eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el ticket' });
  }
};