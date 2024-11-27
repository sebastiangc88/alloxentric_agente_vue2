// routes/solicitudRoutes.js
const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitud.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para obtener todas las solicitudes (requiere autenticación)
router.get('/solicitudes', authMiddleware, solicitudController.obtenerSolicitudes);

// Ruta para crear una nueva solicitud (requiere autenticación)
router.post('/solicitudes', authMiddleware, solicitudController.crearSolicitud);

// Ruta para obtener el total de solicitudes por estado (requiere autenticación)
router.get('/solicitudes/totales', authMiddleware, solicitudController.obtenerTotalesPorEstado);

module.exports = router;