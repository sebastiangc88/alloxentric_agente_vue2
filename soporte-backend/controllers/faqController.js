const Faq = require('../models/Faq');

exports.getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las preguntas frecuentes' });
  }
};

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
