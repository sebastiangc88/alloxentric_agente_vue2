const mongoose = require('mongoose');

const evaluacionSchema = new mongoose.Schema({
  comentario: { type: String, required: true },
  estrellasComentario: { type: Number, required: true, min: 1, max: 5 },
  atencionCliente: { type: Number, required: true, min: 1, max: 5 },
  resolucionProblemas: { type: Number, required: true, min: 1, max: 5 },
  eficiencia: { type: Number, required: true, min: 1, max: 5 },
  conocimientoProducto: { type: Number, required: true, min: 1, max: 5 },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Evaluacion', evaluacionSchema);
