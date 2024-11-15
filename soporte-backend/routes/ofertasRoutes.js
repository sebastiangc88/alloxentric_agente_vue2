const express = require('express');
const router = express.Router();
const ofertaController = require('../controllers/ofertaController');
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener todas las ofertas
router.get('/', ofertaController.getAllOfertas);

// Crear una nueva oferta (requiere autenticaci贸n)
router.post('/', authMiddleware, ofertaController.createOferta);

// Obtener la informaci贸n de una oferta por ID
router.get('/:id', ofertaController.getOfertaById);

// Obtener la disponibilidad horaria de una oferta
router.get('/:id/calendario', ofertaController.getCalendarioOferta);

// Crear una nueva postulaci贸n a una oferta (requiere autenticaci贸n)
router.post('/:oferta_id/post', authMiddleware, ofertaController.crearPostulacion);

// Confirmar una postulación a una oferta (requiere autenticación)
router.put('/:oferta_id/postulaciones/:postulacion_id/confirmar', authMiddleware, ofertaController.confirmarPostulacion);

// Rechazar una postulación a una oferta (requiere autenticación)
router.put('/:oferta_id/postulaciones/:postulacion_id/rechazar', authMiddleware, ofertaController.rechazarPostulacion);

module.exports = router;