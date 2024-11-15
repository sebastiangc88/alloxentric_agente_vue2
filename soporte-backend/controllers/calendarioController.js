const Oferta = require('../models/Oferta');
const moment = require('moment-timezone');

// Obtener eventos del calendario de un usuario por su ID
exports.obtenerEventos = async (req, res) => {
  try {
    const agente_id = req.user.id;
    const fecha_inicio = req.query.fecha_inicio ? moment(req.query.fecha_inicio).startOf('day').toDate() : null;
    const fecha_fin = req.query.fecha_fin ? moment(req.query.fecha_fin).endOf('day').toDate() : null;

    // Obtener las ofertas aceptadas del usuario
    const ofertasAceptadas = await Oferta.find({
      'postulaciones.agente_id': agente_id,
      'postulaciones.estado': 'aceptada'
    });

    const eventos = [];

    ofertasAceptadas.forEach(oferta => {
      oferta.postulaciones.forEach(postulacion => {
        if (postulacion.estado === 'aceptada') {
          const fechaInicioSemana = moment(postulacion.fecha_postulacion).add(1, 'week').startOf('week');

          postulacion.horarios_seleccionados.forEach(horario => {
            const diaSemana = horario.dia;
            const horas = horario.hora_inicio;

            horas.forEach(hora => {
              const evento = {
                titulo: oferta.title,
                fecha_inicio: moment(fechaInicioSemana).day(diaSemana).set({
                  hour: hora.split(':')[0],
                  minute: hora.split(':')[1]
                }).toDate(),
                tipo: 'oferta',
                oferta_id: oferta._id
              };
              eventos.push(evento);
            });
          });
        }
      });
    });

    // Filtrar eventos por fecha si se proporcionan fecha_inicio y fecha_fin
    const eventosFiltrados = eventos.filter(evento => {
      if (fecha_inicio && fecha_fin) {
        return moment(evento.fecha_inicio).isSameOrAfter(fecha_inicio) && moment(evento.fecha_inicio).isSameOrBefore(fecha_fin);
      }
      return true;
    });

    res.status(200).json(eventosFiltrados);
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    res.status(500).json({ message: 'Error al obtener eventos' });
  }
};