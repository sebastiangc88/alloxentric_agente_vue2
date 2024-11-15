const Oferta = require('../models/Oferta');
const Postulacion = require('../models/Postulacion');

// Obtener todas las ofertas
exports.getAllOfertas = async (req, res) => {
  try {
    const ofertas = await Oferta.find().populate('postulaciones');
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

// Obtener la informaci贸n de una oferta por ID
exports.getOfertaById = async (req, res) => {
  try {
    const oferta = await Oferta.findById(req.params.id).populate('postulaciones');
    if (!oferta) {
      return res.status(404).json({ message: 'Oferta no encontrada' });
    }
    res.status(200).json(oferta);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la oferta' });
  }
};

// Obtener la disponibilidad horaria de una oferta
exports.getCalendarioOferta = async (req, res) => {
  try {
    const oferta = await Oferta.findById(req.params.id);
    if (!oferta) {
      return res.status(404).json({ message: 'Oferta no encontrada' });
    }
    res.status(200).json({ disponibilidad: oferta.disponibilidad });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el calendario de la oferta' });
  }
};

// Crear una nueva postulaci贸n a una oferta
exports.crearPostulacion = async (req, res) => {
  try {
    const oferta = await Oferta.findById(req.params.oferta_id);
    if (!oferta) {
      return res.status(404).json({ message: 'Oferta no encontrada' });
    }

    const nuevaPostulacion = new Postulacion({
      agente_id: req.user.id, // Obtener el ID del agente del token
      horarios_seleccionados: req.body.horarios_seleccionados
    });

    oferta.postulaciones.push(nuevaPostulacion);
    await oferta.save();

    res.status(201).json({ message: 'Postulaci贸n creada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la postulaci贸n' });
  }
};

/// Confirmar una postulación a una oferta
exports.confirmarPostulacion = async (req, res) => {
  try {
    const oferta = await Oferta.findById(req.params.oferta_id);
    if (!oferta) {
      return res.status(404).json({ message: 'Oferta no encontrada' });
    }

    const postulacion = oferta.postulaciones.id(req.params.postulacion_id); 
    if (!postulacion) {
      return res.status(404).json({ message: 'Postulación no encontrada' });
    }

    if (postulacion.estado === 'aceptada') {
      return res.status(400).json({ message: 'La postulación ya está confirmada' });
    }

    postulacion.estado = 'aceptada';
    await oferta.save();

    res.status(200).json({ message: 'Postulación confirmada' });
  } catch (error) {
    console.error('Error al confirmar la postulación:', error);
    res.status(500).json({ message: 'Error al confirmar la postulación' });
  }
};

// Rechazar una postulación a una oferta
exports.rechazarPostulacion = async (req, res) => {
  try {
    const oferta = await Oferta.findById(req.params.oferta_id);
    if (!oferta) {
      return res.status(404).json({ message: 'Oferta no encontrada' });
    }

    const postulacion = oferta.postulaciones.id(req.params.postulacion_id);
    if (!postulacion) {
      return res.status(404).json({ message: 'Postulación no encontrada' });
    }

    if (postulacion.estado === 'rechazada') {
      return res.status(400).json({ message: 'La postulación ya está rechazada' });
    }

    postulacion.estado = 'rechazada';
    await oferta.save();

    res.status(200).json({ message: 'Postulación rechazada' });
  } catch (error) {
    console.error('Error al rechazar la postulación:', error);
    res.status(500).json({ message: 'Error al rechazar la postulación' });
  }
};