const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Ruta para obtener todos los pagos (requiere autenticación)
router.get('/pagos', authMiddleware, pagoController.obtenerPagos);

// Ruta para crear un nuevo pago (requiere autenticación)
router.post('/pagos', authMiddleware, pagoController.crearPago);

// Ruta para actualizar un pago por ID (requiere autenticación)
router.put('/pagos/:id', authMiddleware, pagoController.actualizarPago);

// Ruta para eliminar un pago por ID (requiere autenticación)
router.delete('/pagos/:id', authMiddleware, pagoController.eliminarPago);

module.exports = router;
