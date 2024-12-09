// controllers/bancoController.js
const Banco = require('../models/Banco');

exports.guardarDatosBancarios = async (req, res) => {
  try {
    const agente_id = req.params.agente_id; // Get agente_id from URL
    const { banco, tipoCuenta, numeroCuenta } = req.body;

    const nuevosDatos = new Banco({
      agente_id,
      banco,
      tipoCuenta,
      numeroCuenta,
    });

    await nuevosDatos.save();
    res.status(201).json({ message: 'Datos bancarios guardados exitosamente' });
  } catch (error) {
    console.error("Error al guardar datos bancarios:", error);
    res.status(500).json({ message: 'Error al guardar datos bancarios' });
  }
};
