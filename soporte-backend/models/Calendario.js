// models/Calendario.js
const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date },
  tipo: { type: String, required: true }, // Ej. 'reunion', 'tarea', 'recordatorio', 'oferta'
  agente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  oferta_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Oferta' },
  horas_seleccionadas: [{
    dia: { type: String, required: true },
    horas: [{ type: String, required: true }] // Array de horas en formato "HH:mm"
  }]
});

const Calendario = mongoose.model('Calendario', eventoSchema); // Cambia 'Evento' a 'Calendario'

module.exports = Calendario;
