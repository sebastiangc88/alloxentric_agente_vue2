const express = require('express');
const router = express.Router();
const ofertaController = require('../controllers/ofertaController');

// Obtener todas las ofertas
router.get('/', ofertaController.getAllOfertas);

// Crear una nueva oferta
router.post('/', ofertaController.createOferta);

module.exports = router;
