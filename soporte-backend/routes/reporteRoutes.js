const express = require('express');
const router = express.Router();
const {
  obtenerReportes,
  crearReporte,
  actualizarReporte,
  eliminarReporte,
  actualizarPuntosAcumulados,
} = require('../controllers/reporteController'); // Verifica que la ruta sea correcta

// Rutas para reportes
router.get('/reporte', obtenerReportes); // Obtener todos los reportes
router.post('/reporte', crearReporte); // Crear un nuevo reporte
router.put('/reporte/:id', actualizarReporte); // Actualizar un reporte por ID
router.delete('/reporte/:id', eliminarReporte); // Eliminar un reporte por ID
router.patch('/reporte/:id/puntos', actualizarPuntosAcumulados); // Actualizar puntos acumulados de un reporte



module.exports = router;
