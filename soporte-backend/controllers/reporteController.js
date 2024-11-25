const Reporte = require('../models/Reporte');
const Pago = require('../models/Pagos');

// Obtener todos los reportes de un agente
const obtenerReportes = async (req, res) => {
  try {
    const agente_id = req.user.id; // Obtener el ID del agente desde el token
    const reportes = await Reporte.find({ agente_id });
    res.status(200).json(reportes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los reportes', error });
  }
};

// Crear un reporte para un agente
const crearReporte = async (req, res) => {
  try {
    const { agente_id, antecedentes, pagos, bonificaciones } = req.body; // Obtener el ID del agente del cuerpo de la solicitud

    // Obtener información de pagos desde la colección "Pagos"
    const pagosInfo = await Pago.find({ agente_id }); // Filtrar pagos por agente_id

    // Asociar información de monto y empresa
    const pagosConDetalles = pagos.map(pago => {
      const detalle = pagosInfo.find(p => p.nombreEmpresa === pago.empresa);
      return detalle
        ? { ...pago, monto: detalle.pagoMensual }
        : { ...pago, monto: 0 };
    });

    const nuevoReporte = new Reporte({
      agente_id, // Agregar agente_id al reporte
      antecedentes,
      pagos: pagosConDetalles,
      bonificaciones,
    });

    await nuevoReporte.save();
    res.status(201).json(nuevoReporte);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el reporte', error });
  }
};

// Actualizar un reporte de un agente
const actualizarReporte = async (req, res) => {
  const { id } = req.params;
  const agente_id = req.user.id; // Obtener el ID del agente desde el token
  const { antecedentes, pagos, bonificaciones } = req.body;

  try {
    // Verificar que el reporte pertenezca al agente
    const reporte = await Reporte.findOne({ _id: id, agente_id });
    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado o no autorizado' });
    }

    const reporteActualizado = await Reporte.findByIdAndUpdate(
      id,
      { antecedentes, pagos, bonificaciones },
      { new: true }
    );

    res.status(200).json(reporteActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el reporte', error });
  }
};

// Eliminar un reporte de un agente
const eliminarReporte = async (req, res) => {
  const { id } = req.params;
  const agente_id = req.user.id; // Obtener el ID del agente desde el token

  try {
    // Verificar que el reporte pertenezca al agente
    const reporte = await Reporte.findOne({ _id: id, agente_id });
    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado o no autorizado' });
    }

    await Reporte.findByIdAndDelete(id);
    res.status(200).json({ message: 'Reporte eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el reporte', error });
  }
};

// Actualizar puntos acumulados de un agente
const actualizarPuntosAcumulados = async (req, res) => {
  const { id } = req.params;
  const agente_id = req.user.id; // Obtener el ID del agente desde el token

  try {
    // Verificar que el reporte pertenezca al agente
    const reporte = await Reporte.findOne({ _id: id, agente_id });
    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado o no autorizado' });
    }

    const puntosAcumulados = reporte.bonificaciones.actividades.reduce(
      (sum, actividad) => sum + actividad.puntos,
      0
    );

    reporte.bonificaciones.puntosAcumulados = puntosAcumulados;
    await reporte.save();

    res.status(200).json(reporte);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar puntos acumulados', error });
  }
};

module.exports = {
  obtenerReportes,
  crearReporte,
  actualizarReporte,
  eliminarReporte,
  actualizarPuntosAcumulados,
};
