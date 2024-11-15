const mongoose = require('mongoose');
const Postulacion = require('./Postulacion');

const ofertaSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: String,
  type: String,
  category: String,
  hourlyRate: Number,
  jobDescription: String,
  created_at: {
    type: Date,
    default: Date.now
  },
  localizacion: { type: String, required: true },
  bonificaciones: { type: String },
  puntos_alloxentric: { type: Number },
  experiencia: { type: String, required: true },
  idioma: { type: String, required: true },
  nivel_idioma: { type: String, required: true },
  disponibilidad: [{  
    dia: { type: String, required: true },
    horas_disp: [{ type: String, required: true }],
  }],
  cliente: {
    nombre: { type: String, required: true },
    rating: { type: Number, required: true },
    miembroDesde: { type: String, required: true },
    pais: { type: String, required: true }
  },
  postulaciones: [Postulacion.schema] 
});

module.exports = mongoose.model('Oferta', ofertaSchema);