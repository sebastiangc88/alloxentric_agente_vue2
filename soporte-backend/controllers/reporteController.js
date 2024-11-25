const Reporte = require('../models/Reporte');
const Pago = require('../models/Pagos');

// Obtener todos los reportes
const obtenerReportes = async (req, res) => {
  try {
    const reportes = await Reporte.find();
    res.status(200).json(reportes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los reportes', error });
  }
};

// Crear un reporte
const crearReporte = async (req, res) => {
  try {
    const { antecedentes, pagos, bonificaciones } = req.body;

    // Obtener información de pagos desde la colección "Pagos"
    const pagosInfo = await Pago.find();

    // Asociar información de monto y empresa
    const pagosConDetalles = pagos.map(pago => {
      const detalle = pagosInfo.find(p => p.nombreEmpresa === pago.empresa);
      return detalle
        ? { ...pago, monto: detalle.pagoMensual }
        : { ...pago, monto: 0 }; // Si no encuentra la empresa, monto por defecto 0
    });

    const nuevoReporte = new Reporte({
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

// Actualizar un reporte
const actualizarReporte = async (req, res) => {
  const { id } = req.params;
  const { antecedentes, pagos, bonificaciones } = req.body;

  try {
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

// Eliminar un reporte
const eliminarReporte = async (req, res) => {
  const { id } = req.params;

  try {
    await Reporte.findByIdAndDelete(id);
    res.status(200).json({ message: 'Reporte eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el reporte', error });
  }
};

// Actualizar puntos acumulados
const actualizarPuntosAcumulados = async (req, res) => {
  const { id } = req.params;

  try {
    const reporte = await Reporte.findById(id);
    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
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