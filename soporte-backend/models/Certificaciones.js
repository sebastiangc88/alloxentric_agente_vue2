const mongoose = require('mongoose'); // Importa el módulo mongoose para interactuar con MongoDB

// Define el esquema para la colección "Certificacion"
const certificacionSchema = new mongoose.Schema({
  agente_id: { 
    type: mongoose.Schema.Types.ObjectId, // Define agente_id como un ObjectId para referenciar otro documento
    ref: 'Agente', // Referencia al modelo "Agente"
    required: true // Campo requerido
  },
  nombre: { type: String, required: true }, // Nombre de la certificación, requerido
  estado: { 
    type: String, // Estado de la certificación
    enum: ['completado', 'en progreso'], // Valores permitidos: 'completado' o 'en progreso'
    required: true // Campo requerido
  },
  duracion: { type: Number, required: true }, // Duración de la certificación en algún formato numérico, requerido
  certificado: { type: Boolean, default: false }, // Indica si hay un certificado disponible, por defecto es falso
});

// Exporta el modelo "Certificacion" basado en el esquema definido
module.exports = mongoose.model('Certificacion', certificacionSchema);
