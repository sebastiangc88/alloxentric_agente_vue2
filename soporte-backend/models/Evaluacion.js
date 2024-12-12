const mongoose = require('mongoose'); // Importa el módulo mongoose para interactuar con MongoDB

// Define el esquema para la colección "Evaluacion"
const evaluacionSchema = new mongoose.Schema({
  comentario: { type: String, required: true }, // Campo para el comentario del cliente, requerido
  estrellasComentario: { type: Number, required: true, min: 1, max: 5 }, // Puntuación general del comentario (1 a 5 estrellas)
  atencionCliente: { type: Number, required: true, min: 1, max: 5 }, // Evaluación del servicio al cliente (1 a 5)
  resolucionProblemas: { type: Number, required: true, min: 1, max: 5 }, // Evaluación de la resolución de problemas (1 a 5)
  eficiencia: { type: Number, required: true, min: 1, max: 5 }, // Evaluación de la eficiencia en la atención (1 a 5)
  conocimientoProducto: { type: Number, required: true, min: 1, max: 5 }, // Evaluación del conocimiento del producto o servicio (1 a 5)
  fecha: { type: Date, default: Date.now } // Fecha de la evaluación, con valor por defecto la fecha actual
});

// Exporta el modelo "Evaluacion" basado en el esquema definido
module.exports = mongoose.model('Evaluacion', evaluacionSchema);
