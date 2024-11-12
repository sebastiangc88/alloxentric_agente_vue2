// controllers/pagoController.js
const Pago = require('../models/Pagos');

// Obtener todos los pagos
const obtenerPagos = async (req, res) => {
  try {
    const pagos = await Pago.find();
    res.status(200).json(pagos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pagos', error });
  }
};

// Crear un nuevo pago
const crearPago = async (req, res) => {
  const { nombreEmpresa, pagoHora, pagoDiario, pagoMensual } = req.body;
  try {
    const nuevoPago = new Pago({
      nombreEmpresa,
      pagoHora,
      pagoDiario,
      pagoMensual
    });
    await nuevoPago.save();
    res.status(201).json(nuevoPago);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el pago', error });
  }
};

// Actualizar un pago
const actualizarPago = async (req, res) => {
  const { id } = req.params;
  const { pagoHora, pagoDiario, pagoMensual } = req.body;
  try {
    const pagoActualizado = await Pago.findByIdAndUpdate(
      id,
      { pagoHora, pagoDiario, pagoMensual },
      { new: true }
    );
    res.status(200).json(pagoActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el pago', error });
  }
};

// Eliminar un pago
const eliminarPago = async (req, res) => {
  const { id } = req.params;
  try {
    await Pago.findByIdAndDelete(id);
    res.status(200).json({ message: 'Pago eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el pago', error });
  }
};

module.exports = {
  obtenerPagos,
  crearPago,
  actualizarPago,
  eliminarPago
};
