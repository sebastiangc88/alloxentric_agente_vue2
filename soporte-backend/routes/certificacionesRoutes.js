const express = require('express');
const router = express.Router();
const certificacionesController = require('../controllers/certificacionesController');
const authMiddleware = require('../middlewares/authMiddleware'); // Importar el middleware de autenticación

// Rutas para las certificaciones (requiere autenticación)
router.post('/', authMiddleware, certificacionesController.crearCertificacion);
router.get('/', authMiddleware, certificacionesController.obtenerCertificaciones);
router.put('/:id', authMiddleware, certificacionesController.actualizarCertificacion);
router.delete('/:id', authMiddleware, certificacionesController.eliminarCertificacion);

module.exports = router;
