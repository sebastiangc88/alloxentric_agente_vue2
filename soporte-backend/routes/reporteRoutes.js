// routes/reporteRoutes.js
const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');

// Ruta para obtener el reporte del agente
router.get('/reporte', reporteController.obtenerReporte);

// Ruta para crear o actualizar el reporte del agente
router.post('/reporte', reporteController.crearOActualizarReporte);

// Ruta para agregar una actividad de bonificación
router.post('/reporte/actividad', reporteController.agregarActividad);

// Ruta para canjear una recompensa
router.post('/reporte/recompensa', reporteController.canjearRecompensa);

module.exports = router;
