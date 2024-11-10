const mongoose = require('mongoose');

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
  }
});

module.exports = mongoose.model('Oferta', ofertaSchema);
