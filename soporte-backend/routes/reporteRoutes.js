const express = require('express');
const router = express.Router();
const {
  obtenerReportes,
  crearReporte,
  actualizarReporte,
  eliminarReporte,
  actualizarPuntosAcumulados,
} = require('../controllers/reporteController');
const authMiddleware = require('../middlewares/authMiddleware'); // Asegúrate de importar el middleware


// Rutas para reportes (requiere autenticación)
router.get('/reporte', authMiddleware, obtenerReportes); // Obtener todos los reportes
router.post('/reporte', authMiddleware, crearReporte); // Crear un nuevo reporte
router.put('/reporte/:id', authMiddleware, actualizarReporte); // Actualizar un reporte por ID
router.delete('/reporte/:id', authMiddleware, eliminarReporte); // Eliminar un reporte por ID
router.patch('/reporte/:id/puntos', authMiddleware, actualizarPuntosAcumulados); // Actualizar puntos acumulados de un reporte

module.exports = router;
