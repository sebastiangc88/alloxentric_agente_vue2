// models/Banco.js
const mongoose = require('mongoose');

const bancoSchema = new mongoose.Schema({
  agente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agente',
    required: true
  },
  banco: {
    type: String,
    required: true
  },
  tipoCuenta: {
    type: String,
    required: true
  },
  numeroCuenta: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Banco', bancoSchema);
