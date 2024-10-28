const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
  pregunta: {
    type: String,
    required: true,
  },
  respuesta: {
    type: String,
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Cambia a `false` si el usuario no es obligatorio
  },
});

module.exports = mongoose.model('Faq', FaqSchema);
