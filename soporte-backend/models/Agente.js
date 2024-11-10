const mongoose = require('mongoose');

const agenteSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: false // Cambiado a opcional para permitir el registro sin autenticación
  },
  nombreCompleto: { 
    type: String, 
    required: true 
  },
  idFiscal: { 
    type: String, 
    required: true 
  },
  telefono: { 
    type: String, 
    required: true 
  },
  whatsappVerificado: { 
    type: Boolean, 
    default: false 
  },
  fechaNacimiento: { 
    type: Date, 
    required: true 
  },
  genero: { 
    type: String, 
    enum: ['Masculino', 'Femenino', 'Otro'], 
    required: true 
  },
  pais: { 
    type: String, 
    required: true 
  },
  tiposAgenteSeleccionados: [{ 
    type: String, 
    enum: ['Agente de Soporte', 'Agente de Servicios', 'Agente de Cobranzas', 'Agente de Ventas'] 
  }],
  experiencia: { 
    type: Number, 
    required: true 
  },
  habilidades: { 
    type: String 
  },
  idiomas: [{
    idioma: { 
      type: String, 
      required: true 
    },
    nivel: { 
      type: String, 
      enum: ['Básico', 'Intermedio', 'Avanzado', 'Nativo'], 
      required: true 
    }
  }],
  otroIdioma: { 
    type: String 
  }
});

module.exports = mongoose.model('Agente', agenteSchema);
