// controllers/solicitudController.js
const Solicitud = require('../models/Solicitud');
const Oferta = require('../models/Oferta');

// Obtener todas las solicitudes (postulaciones)
const obtenerSolicitudes = async (req, res) => {
  try {
    const agenteId = req.user.id; // Obtener el ID del agente desde el token
    const ofertas = await Oferta.find({ 'postulaciones.agente_id': agenteId }).populate('postulaciones');

    // Extraer las postulaciones de las ofertas
    const solicitudes = [];
    ofertas.forEach(oferta => {
      oferta.postulaciones.forEach(postulacion => {
        if (postulacion.agente_id.equals(agenteId)) { // Asegurarse de que la postulación pertenece al agente
          solicitudes.push({
            id: postulacion._id,
            ofertaId: oferta.id,
            posicion: oferta.title, // Agregar el título de la oferta
            fecha: postulacion.fecha_postulacion,
            estado: postulacion.estado,
            empresa: oferta.cliente.nombre
          });
        }
      });
    });

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
    const agenteId = req.user.id; // Obtener el ID del agente desde el token

    // Obtener todas las ofertas donde el agente ha postulado
    const ofertas = await Oferta.find({ 'postulaciones.agente_id': agenteId });

    let aceptadas = 0;
    let rechazadas = 0;
    let enProceso = 0;

    // Iterar sobre las ofertas y contar las postulaciones por estado
    ofertas.forEach(oferta => {
      oferta.postulaciones.forEach(postulacion => {
        if (postulacion.agente_id.equals(agenteId)) { // Asegurarse de que la postulación pertenece al agente
          switch (postulacion.estado) {
            case 'aceptada':
              aceptadas++;
              break;
            case 'rechazada':
              rechazadas++;
              break;
            default: // Asumiendo que cualquier otro estado es "en proceso"
              enProceso++;
              break;
          }
        }
      });
    });

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
