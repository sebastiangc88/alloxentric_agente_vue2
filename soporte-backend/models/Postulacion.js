// models/Postulacion.js
const mongoose = require('mongoose');

const postulacionSchema = new mongoose.Schema({
  agente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Agente', required: true },
  horarios_seleccionados: [{
    dia: { type: String, required: true },
    hora_inicio: { type: String, required: true },
    hora_fin: { type: String, required: true }
  }],
  estado: { type: String, enum: ['pendiente', 'aceptada', 'rechazada'], default: 'pendiente' },
  fecha_postulacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Postulacion', postulacionSchema);