const express = require('express');
const { registrarAgente, obtenerDatosAgente, actualizarDatosAgente } = require('../controllers/agenteController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Ruta para registrar un agente (sin autenticación, ya que es el registro inicial)
router.post('/registro', registrarAgente);

// Ruta para obtener los datos del agente (requiere autenticación)
router.get('/datos', authMiddleware, obtenerDatosAgente);

// Ruta para actualizar los datos del agente (requiere autenticación)
router.put('/actualizar', authMiddleware, actualizarDatosAgente);

module.exports = router;