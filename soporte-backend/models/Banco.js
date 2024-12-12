// models/Banco.js
const mongoose = require('mongoose');

const bancoSchema = new mongoose.Schema({
  agente_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agente',
    required: true //indica soi es obligatorio
  },
  banco: {
    type: String, //indica el tipo de dato
    required: true //indica soi es obligatorio
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
