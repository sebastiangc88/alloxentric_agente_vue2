// models/Reporte.js
const mongoose = require('mongoose');

const reporteSchema = new mongoose.Schema({
  antecedentes: [
    {
      fecha: {
        type: Date,
        required: true,
      },
      descripcion: {
        type: String,
        required: true,
      },
    },
  ],
  pagos: [
    {
      fecha: {
        type: Date,
        required: true,
      },
      monto: {
        type: Number,
        required: true,
      },
      empresa: {
        type: String,
        required: true,
      },
      estado: {
        type: String,
        required: true,
        enum: ['Pagado', 'Pendiente'],
      },
    },
  ],
  bonificaciones: {
    puntosAcumulados: {
      type: Number,
      default: 0,
    },
    actividades: [
      {
        fecha: {
          type: Date,
          required: true,
        },
        actividad: {
          type: String,
          required: true,
        },
        puntos: {
          type: Number,
          required: true,
        },
      },
    ],
    recompensas: [
      {
        nombre: {
          type: String,
          required: true,
        },
        puntosRequeridos: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

module.exports = mongoose.model('Reporte', reporteSchema);
