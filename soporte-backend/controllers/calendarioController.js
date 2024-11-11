// controllers/calendarioController.js
const Calendario = require('../models/Calendario');
const moment = require('moment-timezone');
const mongoose = require('mongoose');

// Obtener eventos del calendario de un usuario por su ID
exports.obtenerEventos = async (req, res) => {
  try {
    console.log("Entrando al método obtenerEventos"); 
    const agente_id = req.user.id; // Obtener el ID del agente del token
    console.log("ID del usuario:",  agente_id); 

    const fecha_inicio = req.query.fecha_inicio ? moment(req.query.fecha_inicio).startOf('day').toDate() : null;
    const fecha_fin = req.query.fecha_fin ? moment(req.query.fecha_fin).endOf('day').toDate() : null;

    let query = { agente_id };
    if (fecha_inicio && fecha_fin) {
      query.fecha_inicio = { $gte: fecha_inicio, $lte: fecha_fin };
    }

    console.log("Consulta a la base de datos:", query); 

    const eventos = await Calendario.find(query).populate('oferta_id');
    console.log("Eventos encontrados:", eventos); 
    res.status(200).json(eventos);
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    res.status(500).json({ message: 'Error al obtener eventos' });
  }
};

// Crear un nuevo evento en el calendario
exports.crearEvento = async (req, res) => {
  try {
    console.log("Entrando al método crearEvento");
    const agente_id = req.user.id; // Obtener el ID del agente del token
    console.log("ID del usuario:", agente_id);
    console.log("Cuerpo de la solicitud:", req.body);

    const nuevoEvento = new Calendario({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      fecha_inicio: req.body.fecha_inicio,
      fecha_fin: req.body.fecha_fin,  
      tipo: req.body.tipo,
      agente_id: new mongoose.Types.ObjectId(agente_id), // Convertir a ObjectId
      oferta_id: req.body.oferta_id,
      horas_seleccionadas: req.body.horas_seleccionadas,
    });

    console.log("Nuevo evento a guardar:", nuevoEvento);
    const eventoGuardado = await nuevoEvento.save();
    console.log("Evento guardado:", eventoGuardado);
    res.status(201).json(eventoGuardado);
  } catch (error) {
    console.error("Error al crear evento:", error);
    res.status(500).json({ message: 'Error al crear evento' });
  }
};
