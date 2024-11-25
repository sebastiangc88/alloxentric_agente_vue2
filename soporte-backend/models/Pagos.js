// models/Pagos.js
const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  agente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Agente', required: true }, // Agrega el ID del agente
  nombreEmpresa: {
    type: String,
    required: true
  },
  pagoHora: {
    type: Number,
    required: true
  },
  pagoDiario: {
    type: Number,
    required: true
  },
  pagoMensual: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Pago', pagoSchema);
