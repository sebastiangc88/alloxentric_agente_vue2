// controllers/reporteControllers.js
const Reporte = require('../models/Reporte');

// Obtener el reporte del agente
const obtenerReporte = async (req, res) => {
  try {
    const reporte = await Reporte.findOne();
    res.status(200).json(reporte);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el reporte', error });
  }
};

// Crear o actualizar el reporte del agente
const crearOActualizarReporte = async (req, res) => {
  const { antecedentes, pagos, bonificaciones } = req.body;
  try {
    let reporte = await Reporte.findOne();

    if (reporte) {
      // Actualizar el reporte existente
      reporte.antecedentes = antecedentes || reporte.antecedentes;
      reporte.pagos = pagos || reporte.pagos;
      reporte.bonificaciones = bonificaciones || reporte.bonificaciones;
    } else {
      // Crear un nuevo reporte
      reporte = new Reporte({ antecedentes, pagos, bonificaciones });
    }

    await reporte.save();
    res.status(201).json(reporte);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear o actualizar el reporte', error });
  }
};

// Agregar una actividad de bonificación
const agregarActividad = async (req, res) => {
  const { fecha, actividad, puntos } = req.body;
  try {
    const reporte = await Reporte.findOne();
    if (!reporte) return res.status(404).json({ message: 'Reporte no encontrado' });

    reporte.bonificaciones.actividades.push({ fecha, actividad, puntos });
    reporte.bonificaciones.puntosAcumulados += puntos;
    await reporte.save();

    res.status(200).json(reporte);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar actividad', error });
  }
};

// Canjear una recompensa
const canjearRecompensa = async (req, res) => {
  const { nombre, puntosRequeridos } = req.body;
  try {
    const reporte = await Reporte.findOne();
    if (!reporte) return res.status(404).json({ message: 'Reporte no encontrado' });

    if (reporte.bonificaciones.puntosAcumulados < puntosRequeridos) {
      return res.status(400).json({ message: 'Puntos insuficientes para canjear esta recompensa' });
    }

    reporte.bonificaciones.puntosAcumulados -= puntosRequeridos;
    reporte.bonificaciones.recompensas.push({ nombre, puntosRequeridos });
    await reporte.save();

    res.status(200).json(reporte);
  } catch (error) {
    res.status(500).json({ message: 'Error al canjear recompensa', error });
  }
};

module.exports = {
  obtenerReporte,
  crearOActualizarReporte,
  agregarActividad,
  canjearRecompensa,
};
