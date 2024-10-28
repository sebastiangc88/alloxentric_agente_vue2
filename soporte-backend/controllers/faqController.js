const Faq = require('../models/Faq');

// Obtener todas las FAQs
exports.getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las preguntas frecuentes' });
  }
};

// Crear una nueva FAQ
exports.createFaq = async (req, res) => {
  try {
    const { pregunta, respuesta } = req.body;
    const faq = new Faq({ pregunta, respuesta });
    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la FAQ' });
  }
};

// Actualizar una FAQ existente
exports.updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { pregunta, respuesta } = req.body;
    const updatedFaq = await Faq.findByIdAndUpdate(id, { pregunta, respuesta }, { new: true });
    if (!updatedFaq) {
      return res.status(404).json({ message: 'FAQ no encontrada' });
    }
    res.status(200).json(updatedFaq);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la FAQ' });
  }
};

// Eliminar una FAQ
exports.deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFaq = await Faq.findByIdAndDelete(id);
    if (!deletedFaq) {
      return res.status(404).json({ message: 'FAQ no encontrada' });
    }
    res.status(200).json({ message: 'FAQ eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la FAQ' });
  }
};