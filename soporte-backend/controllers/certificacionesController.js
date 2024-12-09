const Certificacion = require('../models/Certificaciones');

// Crear una nueva certificación para un agente
exports.crearCertificacion = async (req, res) => {
  try {
    const agente_id = req.user.id; // Obtener el ID del agente del token
    const { nombre, estado, duracion, certificado } = req.body;

    const nuevaCertificacion = new Certificacion({
      agente_id, // Agregar el agente_id a la certificación
      nombre,
      estado,
      duracion,
      certificado
    });

    await nuevaCertificacion.save();
    res.status(201).json(nuevaCertificacion);
  } catch (error) {
    console.error('Error al crear la certificación:', error);
    res.status(500).json({ message: 'Error al crear la certificación' });
  }
};

// Obtener todas las certificaciones de un agente
exports.obtenerCertificaciones = async (req, res) => {
  try {
    const agente_id = req.user.id; // Obtener el ID del agente del token
    const certificaciones = await Certificacion.find({ agente_id }); // Filtrar certificaciones por agente_id
    res.status(200).json(certificaciones);
  } catch (error) {
    console.error('Error al obtener las certificaciones:', error);
    res.status(500).json({ message: 'Error al obtener las certificaciones' });
  }
};

// Actualizar una certificación de un agente
exports.actualizarCertificacion = async (req, res) => {
  const { id } = req.params;
  const agente_id = req.user.id; // Obtener el ID del agente del token
  const { nombre, estado, duracion, certificado } = req.body;

  try {
    // Verificar que la certificación pertenezca al agente
    const certificacion = await Certificacion.findOne({ _id: id, agente_id });
    if (!certificacion) {
      return res.status(404).json({ message: 'Certificación no encontrada o no autorizada' });
    }

    const certificacionActualizada = await Certificacion.findByIdAndUpdate(
      id,
      { nombre, estado, duracion, certificado },
      { new: true }
    );

    res.status(200).json(certificacionActualizada);
  } catch (error) {
    console.error('Error al actualizar la certificación:', error);
    res.status(500).json({ message: 'Error al actualizar la certificación' });
  }
};

// Eliminar una certificación de un agente
exports.eliminarCertificacion = async (req, res) => {
  const { id } = req.params;
  const agente_id = req.user.id; // Obtener el ID del agente del token

  try {
    // Verificar que la certificación pertenezca al agente
    const certificacion = await Certificacion.findOne({ _id: id, agente_id });
    if (!certificacion) {
      return res.status(404).json({ message: 'Certificación no encontrada o no autorizada' });
    }

    await Certificacion.findByIdAndDelete(id);
    res.status(200).json({ message: 'Certificación eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la certificación:', error);
    res.status(500).json({ message: 'Error al eliminar la certificación' });
  }
};
