// models/Postulacion.js
const mongoose = require('mongoose'); // Importa el módulo mongoose para interactuar con MongoDB

// Define el esquema para la colección "Postulacion"
const postulacionSchema = new mongoose.Schema({
  agente_id: { 
    type: mongoose.Schema.Types.ObjectId, // Define agente_id como un ObjectId para referenciar otro documento
    ref: 'Agente', // Referencia al modelo "Agente"
    required: true // Campo requerido
  },
  horarios_seleccionados: [{ 
    dia: { type: String, required: true }, // Día seleccionado para la postulación, obligatorio
    hora_postulacion: [{ 
      type: String, required: true // Horas específicas postuladas para el día, obligatorio
    }]
  }],
  estado: { 
    type: String, // Estado de la postulación
    enum: ['pendiente', 'aceptada', 'rechazada'], // Valores permitidos para el estado
    default: 'pendiente' // Valor por defecto: 'pendiente'
  },
  fecha_postulacion: { 
    type: Date, // Fecha en que se realizó la postulación
    default: Date.now // Valor por defecto: la fecha actual
  }
});

// Exporta el modelo "Postulacion" basado en el esquema definido
module.exports = mongoose.model('Postulacion', postulacionSchema);
