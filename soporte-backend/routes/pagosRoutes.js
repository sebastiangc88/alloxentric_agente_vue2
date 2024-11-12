// routes/pagosRoutes.js
const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');

// Ruta para obtener todos los pagos
router.get('/pagos', pagoController.obtenerPagos);

// Ruta para crear un nuevo pago
router.post('/pagos', pagoController.crearPago);

// Ruta para actualizar un pago por ID
router.put('/pagos/:id', pagoController.actualizarPago);

// Ruta para eliminar un pago por ID
router.delete('/pagos/:id', pagoController.eliminarPago);

module.exports = router;
