const mongoose = require('mongoose');

const certificacionSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  estado: { type: String, enum: ['completado', 'en progreso'], required: true },
  duracion: { type: Number, required: true }, // Duración en horas
  certificado: { type: Boolean, default: false }, // Indica si el curso genera un certificado
});

module.exports = mongoose.model('Certificacion', certificacionSchema);
