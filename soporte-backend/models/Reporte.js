const mongoose = require('mongoose'); // Importa el módulo mongoose para interactuar con MongoDB

// Define el esquema para "Antecedentes" relacionados con un agente
const antecedenteSchema = new mongoose.Schema({
  agente_id: { 
    type: mongoose.Schema.Types.ObjectId, // Define agente_id como un ObjectId para referenciar otro documento
    ref: 'Agente', // Referencia al modelo "Agente"
    required: true // Campo requerido
  },
  fecha: { type: Date, required: true }, // Fecha del antecedente, obligatorio
  descripcion: { type: String, required: true } // Descripción del antecedente, obligatorio
});

// Define el esquema para "Pagos" relacionados con un agente
const pagoSchema = new mongoose.Schema({
  agente_id: { 
    type: mongoose.Schema.Types.ObjectId, // Define agente_id como un ObjectId para referenciar otro documento
    ref: 'Agente', // Referencia al modelo "Agente"
    required: true // Campo requerido
  },
  fecha: { type: Date, required: true }, // Fecha del pago, obligatorio
  monto: { type: Number, required: true }, // Monto del pago, obligatorio
  empresa: { type: String, required: true }, // Nombre de la empresa que realizó el pago, obligatorio
  estado: { 
    type: String, // Estado del pago
    enum: ['Pagado', 'Pendiente'], // Valores permitidos: 'Pagado' o 'Pendiente'
    required: true // Campo requerido
  }
});

// Define el esquema para "Actividades" realizadas por un agente
const actividadSchema = new mongoose.Schema({
  agente_id: { 
    type: mongoose.Schema.Types.ObjectId, // Define agente_id como un ObjectId para referenciar otro documento
    ref: 'Agente', // Referencia al modelo "Agente"
    required: true // Campo requerido
  },
  fecha: { type: Date, required: true }, // Fecha de la actividad, obligatorio
  actividad: { type: String, required: true }, // Descripción de la actividad, obligatorio
  puntos: { type: Number, required: true } // Puntos obtenidos por la actividad, obligatorio
});

// Define el esquema para "Recompensas" asociadas a un agente
const recompensaSchema = new mongoose.Schema({
  agente_id: { 
    type: mongoose.Schema.Types.ObjectId, // Define agente_id como un ObjectId para referenciar otro documento
    ref: 'Agente', // Referencia al modelo "Agente"
    required: true // Campo requerido
  },
  nombre: { type: String, required: true }, // Nombre de la recompensa, obligatorio
  puntosRequeridos: { type: Number, required: true } // Puntos necesarios para obtener la recompensa, obligatorio
});

// Define el esquema principal "Reporte" que agrupa antecedentes, pagos, bonificaciones y actividades de un agente
const reporteSchema = new mongoose.Schema({
  agente_id: { 
    type: mongoose.Schema.Types.ObjectId, // Define agente_id como un ObjectId para referenciar otro documento
    ref: 'Agente', // Referencia al modelo "Agente"
    required: true // Campo requerido
  },
  antecedentes: [antecedenteSchema], // Lista de antecedentes asociados al agente
  pagos: [pagoSchema], // Lista de pagos asociados al agente
  bonificaciones: { 
    puntosAcumulados: { type: Number, default: 0 }, // Total de puntos acumulados, con un valor por defecto de 0
    actividades: [actividadSchema], // Lista de actividades realizadas por el agente
    recompensas: [recompensaSchema] // Lista de recompensas asociadas al agente
  }
});

// Exporta el modelo "Reporte" basado en el esquema definido
module.exports = mongoose.model('Reporte', reporteSchema);
