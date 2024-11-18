const express = require('express');
const router = express.Router();
const certificacionesController = require('../controllers/certificacionesController');

// Rutas para las certificaciones
router.post('/', certificacionesController.crearCertificacion);
router.get('/', certificacionesController.obtenerCertificaciones);
router.put('/:id', certificacionesController.actualizarCertificacion);
router.delete('/:id', certificacionesController.eliminarCertificacion);

module.exports = router;
