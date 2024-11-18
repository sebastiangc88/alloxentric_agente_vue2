const Oferta = require('../models/Oferta');
const moment = require('moment-timezone');

exports.obtenerEventos = async (req, res) => {
  try {
    // 1. Obtener el ID del agente del token de autenticación
    console.log("Entrando al método obtenerEventos");
    const agente_id = req.user.id;
    console.log("ID del agente:", agente_id); 

    // 2. Obtener las fechas de inicio y fin de la consulta (si se proporcionan)
    const fecha_inicio = req.query.fecha_inicio ? moment(req.query.fecha_inicio).startOf('day').toDate() : null;
    const fecha_fin = req.query.fecha_fin ? moment(req.query.fecha_fin).endOf('day').toDate() : null;

    console.log("Fecha inicio:", fecha_inicio);
    console.log("Fecha fin:", fecha_fin);

    // 3. Buscar en la base de datos las ofertas donde el agente ha postulado y la postulación está aceptada
    const ofertasAceptadas = await Oferta.find({
      'postulaciones.agente_id': agente_id,
      'postulaciones.estado': 'aceptada'
    });

    console.log("Ofertas aceptadas:", ofertasAceptadas);


    // 4. Crear un array para almacenar los eventos del calendario
    const eventos = [];

    // 5. Iterar sobre las ofertas aceptadas
    ofertasAceptadas.forEach(oferta => {
      if (oferta.postulaciones) 
      console.log("Procesando oferta:", oferta.title);
      // 6. Iterar sobre las postulaciones de cada oferta
      oferta.postulaciones.forEach(postulacion => {
        // 7. Verificar si la postulación pertenece al agente actual y si está aceptada
        if (postulacion.estado === 'aceptada') {
          console.log("Postulación aceptada encontrada");
          // 8. Calcular la fecha de inicio de la semana siguiente a la fecha de postulación
          const fechaInicioSemana = moment(postulacion.fecha_postulacion).add(1, 'week').startOf('week');
          console.log("Fecha inicio semana:", fechaInicioSemana.format('YYYY-MM-DD'));

          // 9. Iterar sobre los horarios seleccionados en la postulación
          postulacion.horarios_seleccionados.forEach(horario => {
            const diaSemana = horario.dia;
            const horas = horario.hora_inicio;

            // 10. Iterar sobre las horas del día
            horas.forEach(hora => {
              // 11. Crear un objeto evento para cada hora seleccionada
              const evento = {
                titulo: oferta.title,
                fecha_inicio: moment(fechaInicioSemana).day(diaSemana).set({
                  hour: hora.split(':')[0],
                  minute: hora.split(':')[1]
                }).toDate(),
                tipo: 'oferta',
                oferta_id: oferta._id,
                descripcion: oferta.jobDescription
              };
              console.log("Evento creado:", evento);
              // 12. Agregar el evento al array de eventos
              eventos.push(evento);
            });
          });
        }
      });
    });

    // 13. Filtrar eventos por fecha si se proporcionan fecha_inicio y fecha_fin
    const eventosFiltrados = eventos.filter(evento => {
      if (fecha_inicio && fecha_fin) {
        return moment(evento.fecha_inicio).isSameOrAfter(fecha_inicio) && moment(evento.fecha_inicio).isSameOrBefore(fecha_fin);
      }
      return true; // Si no se especifican fechas, se muestran todos los eventos
    });

    // 14. Enviar la respuesta con los eventos filtrados
    res.status(200).json(eventosFiltrados);
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    res.status(500).json({ message: 'Error al obtener eventos' });
  }
};