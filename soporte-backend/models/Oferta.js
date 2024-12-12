const mongoose = require('mongoose'); // Importa el módulo mongoose para interactuar con MongoDB
const Postulacion = require('./Postulacion'); // Importa el modelo Postulacion para usarlo como referencia

// Define el esquema para la colección "Oferta"
const ofertaSchema = new mongoose.Schema({
  id: { 
    type: Number, // Campo numérico que identifica de forma única la oferta
    required: true, // Campo requerido
    unique: true // Debe ser único en la colección
  },
  title: String, // Título de la oferta de trabajo
  type: String, // Tipo de trabajo (e.g., remoto, presencial)
  category: String, // Categoría del trabajo
  hourlyRate: Number, // Tarifa por hora
  jobDescription: String, // Descripción del trabajo
  created_at: { 
    type: Date, // Fecha de creación de la oferta
    default: Date.now // Valor por defecto: la fecha actual
  },
  localizacion: { type: String, required: true }, // Ubicación requerida para el trabajo, obligatorio
  bonificaciones: { type: String }, // Información sobre bonificaciones (opcional)
  puntos_alloxentric: { type: Number }, // Puntos asociados al trabajo en la plataforma Alloxentric
  experiencia: { type: String, required: true }, // Nivel de experiencia requerido, obligatorio
  idioma: { type: String, required: true }, // Idioma requerido, obligatorio
  nivel_idioma: { type: String, required: true }, // Nivel del idioma requerido, obligatorio
  disponibilidad: [{  
    dia: { type: String, required: true }, // Día de la disponibilidad, obligatorio
    horas_disp: [{ type: String, required: true }], // Horas disponibles en ese día, obligatorio
  }],
  cliente: { 
    nombre: { type: String, required: true }, // Nombre del cliente, obligatorio
    rating: { type: Number, required: true }, // Puntuación del cliente, obligatorio
    miembroDesde: { type: String, required: true }, // Fecha desde la cual el cliente es miembro, obligatorio
    pais: { type: String, required: true } // País del cliente, obligatorio
  },
  postulaciones: [Postulacion.schema] // Lista de postulaciones asociadas a esta oferta, utilizando el esquema Postulacion
});

// Exporta el modelo "Oferta" basado en el esquema definido
module.exports = mongoose.model('Oferta', ofertaSchema);
