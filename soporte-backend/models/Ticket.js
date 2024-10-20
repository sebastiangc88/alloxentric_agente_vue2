const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  asunto: { type: String, required: true },
  descripcion: { type: String, required: true },
  usuario: { type: String, required: true },
  estado: { type: String, default: 'pendiente' },
});

module.exports = mongoose.model('Ticket', ticketSchema);
