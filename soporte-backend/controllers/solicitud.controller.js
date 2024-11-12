// controllers/solicitudController.js
const Solicitud = require('../models/Solicitud');

// Obtener todas las solicitudes
const obtenerSolicitudes = async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();
    res.status(200).json(solicitudes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las solicitudes', error });
  }
};

// Crear una nueva solicitud
const crearSolicitud = async (req, res) => {
  const { posicion, empresa, fecha, estado } = req.body;
  try {
    const nuevaSolicitud = new Solicitud({
      posicion,
      empresa,
      fecha,
      estado
    });
    await nuevaSolicitud.save();
    res.status(201).json(nuevaSolicitud);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la solicitud', error });
  }
};

// Obtener el total de solicitudes por estado
const obtenerTotalesPorEstado = async (req, res) => {
  try {
    const aceptadas = await Solicitud.countDocuments({ estado: 'Aceptada' });
    const rechazadas = await Solicitud.countDocuments({ estado: 'Rechazada' });
    const enProceso = await Solicitud.countDocuments({ estado: 'En Proceso' });

    res.status(200).json({ aceptadas, rechazadas, enProceso });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los totales por estado', error });
  }
};

module.exports = {
  obtenerSolicitudes,
  crearSolicitud,
  obtenerTotalesPorEstado
};
