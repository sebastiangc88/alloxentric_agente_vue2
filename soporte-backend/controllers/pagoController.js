const Pago = require('../models/Pagos');

// Obtener todos los pagos de un agente
const obtenerPagos = async (req, res) => {
  try {
    const agente_id = req.user.id; // Obtener el ID del agente desde el token
    const pagos = await Pago.find({ agente_id }); // Filtrar pagos por agente_id
    res.status(200).json(pagos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pagos', error });
  }
};

// Crear un nuevo pago para un agente
const crearPago = async (req, res) => {
  const { agente_id, nombreEmpresa, pagoHora, pagoDiario, pagoMensual } = req.body;
  try {
    const nuevoPago = new Pago({
      agente_id, // Agregar el ID del agente al nuevo pago
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

// Actualizar un pago de un agente
const actualizarPago = async (req, res) => {
  const { id } = req.params;
  const agente_id = req.user.id; // Obtener el ID del agente desde el token
  const { pagoHora, pagoDiario, pagoMensual } = req.body;
  try {
    // Verificar que el pago pertenezca al agente
    const pago = await Pago.findOne({ _id: id, agente_id });
    if (!pago) {
      return res.status(404).json({ message: 'Pago no encontrado o no autorizado' });
    }

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

// Eliminar un pago de un agente
const eliminarPago = async (req, res) => {
  const { id } = req.params;
  const agente_id = req.user.id; // Obtener el ID del agente desde el token
  try {
    // Verificar que el pago pertenezca al agente
    const pago = await Pago.findOne({ _id: id, agente_id });
    if (!pago) {
      return res.status(404).json({ message: 'Pago no encontrado o no autorizado' });
    }

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