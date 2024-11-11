const express = require('express');
const router = express.Router();
const calendarioController = require('../controllers/calendarioController'); 
const authMiddleware = require('../middlewares/authMiddleware');

// Obtener eventos del calendario de un usuario por su ID (requiere autenticación)
router.get('/:id', authMiddleware, calendarioController.obtenerEventos);

// Crear un nuevo evento en el calendario de un usuario (requiere autenticación)
router.post('/:id', authMiddleware, calendarioController.crearEvento);

module.exports = router;
