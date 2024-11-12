// models/Solicitud.js
const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  posicion: {
    type: String,
    required: true
  },
  empresa: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  estado: {
    type: String,
    required: true,
    enum: ['Aceptada', 'Rechazada', 'En Proceso']
  }
});

module.exports = mongoose.model('Solicitud', solicitudSchema);
