const mongoose = require('mongoose');

const antecedenteSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  descripcion: { type: String, required: true },
});

const pagoSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  monto: { type: Number, required: true },
  empresa: { type: String, required: true },
  estado: { type: String, enum: ['Pagado', 'Pendiente'], required: true },
});

const actividadSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  actividad: { type: String, required: true },
  puntos: { type: Number, required: true },
});

const recompensaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  puntosRequeridos: { type: Number, required: true },
});

const reporteSchema = new mongoose.Schema({
  antecedentes: [antecedenteSchema],
  pagos: [pagoSchema],
  bonificaciones: {
    puntosAcumulados: { type: Number, default: 0 },
    actividades: [actividadSchema],
    recompensas: [recompensaSchema],
  },
});

module.exports = mongoose.model('Reporte', reporteSchema);
