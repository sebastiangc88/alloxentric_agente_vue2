const express = require('express');
const { registrarAgente, obtenerDatosAgente, actualizarDatosAgente, verificarAgente } = require('../controllers/agenteController');
const authMiddleware = require('../middlewares/authMiddleware');
const bancoController = require('../controllers/bancoController');
const router = express.Router();

// Ruta para registrar un agente
router.post('/registro', authMiddleware, registrarAgente);

// Ruta para obtener los datos del agente (requiere autenticación)
router.get('/datos', authMiddleware, obtenerDatosAgente);

// Ruta para actualizar los datos del agente (requiere autenticación)
router.put('/actualizar', authMiddleware, actualizarDatosAgente);

// Ruta para guardar datos bancarios (requiere autenticación)
router.post('/:agente_id/bancario', authMiddleware, bancoController.guardarDatosBancarios);

// Ruta para verificar si el agente ya está registrado
router.get('/:id/verificar', authMiddleware, verificarAgente);


module.exports = router;
