const Certificacion = require('../models/Certificaciones');

// Crear un nuevo curso o certificación
exports.crearCertificacion = async (req, res) => {
  try {
    const nuevaCertificacion = new Certificacion(req.body);
    const certificacionGuardada = await nuevaCertificacion.save();
    res.status(201).json(certificacionGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear la certificación', error });
  }
};

// Obtener todas las certificaciones y calcular el progreso general
exports.obtenerCertificaciones = async (req, res) => {
  try {
    const certificaciones = await Certificacion.find();

    // Clasificar las certificaciones
    const completadas = certificaciones.filter((cert) => cert.estado === 'completado');
    const enProgreso = certificaciones.filter((cert) => cert.estado === 'en progreso');

    // Calcular el progreso general
    const totalCertificaciones = certificaciones.length;
    const progresoGeneral = totalCertificaciones
      ? Math.round((completadas.length / totalCertificaciones) * 100)
      : 0;

    res.status(200).json({
      progresoGeneral,
      completadas,
      enProgreso,
      disponibles: certificaciones, // Si necesitas mostrar todos los cursos disponibles
    });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al obtener las certificaciones', error });
  }
};

// Actualizar el estado de una certificación
exports.actualizarCertificacion = async (req, res) => {
  try {
    const certificacionActualizada = await Certificacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(certificacionActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar la certificación', error });
  }
};

// Eliminar una certificación
exports.eliminarCertificacion = async (req, res) => {
  try {
    await Certificacion.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: 'Certificación eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar la certificación', error });
  }
};
