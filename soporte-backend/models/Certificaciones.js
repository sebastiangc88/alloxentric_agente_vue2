const mongoose = require('mongoose');

const certificacionSchema = new mongoose.Schema({
  agente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Agente', required: true }, // Add agente_id
  nombre: { type: String, required: true },
  estado: { type: String, enum: ['completado', 'en progreso'], required: true },
  duracion: { type: Number, required: true },
  certificado: { type: Boolean, default: false },
});

module.exports = mongoose.model('Certificacion', certificacionSchema);
