const Oferta = require('../models/Oferta');

// Obtener todas las ofertas
exports.getAllOfertas = async (req, res) => {
  try {
    const ofertas = await Oferta.find();
    res.status(200).json(ofertas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las ofertas' });
  }
};

// Crear una nueva oferta
exports.createOferta = async (req, res) => {
  try {
    const nuevaOferta = new Oferta(req.body);
    await nuevaOferta.save();
    res.status(201).json(nuevaOferta);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la oferta' });
  }
};
