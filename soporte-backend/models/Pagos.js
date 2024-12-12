// models/Pagos.js
const mongoose = require('mongoose'); // Importa el módulo mongoose para interactuar con MongoDB

// Define el esquema para la colección "Pago"
const pagoSchema = new mongoose.Schema({
  agente_id: { 
    type: mongoose.Schema.Types.ObjectId, // Define agente_id como un ObjectId para referenciar otro documento
    ref: 'Agente', // Referencia al modelo "Agente"
    required: true // Campo requerido
  },
  nombreEmpresa: { 
    type: String, // Nombre de la empresa asociada al pago
    required: true // Campo requerido
  },
  pagoHora: { 
    type: Number, // Monto del pago por hora
    required: true // Campo requerido
  },
  pagoDiario: { 
    type: Number, // Monto del pago diario
    required: true // Campo requerido
  },
  pagoMensual: { 
    type: Number, // Monto del pago mensual
    required: true // Campo requerido
  }
});

// Exporta el modelo "Pago" basado en el esquema definido
module.exports = mongoose.model('Pago', pagoSchema);
