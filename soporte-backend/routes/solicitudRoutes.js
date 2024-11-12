// routes/solicitudRoutes.js
const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitud.controller');

// Ruta para obtener todas las solicitudes
router.get('/solicitudes', solicitudController.obtenerSolicitudes);

// Ruta para crear una nueva solicitud
router.post('/solicitudes', solicitudController.crearSolicitud);

// Ruta para obtener el total de solicitudes por estado
router.get('/solicitudes/totales', solicitudController.obtenerTotalesPorEstado);

module.exports = router;
