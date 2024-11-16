const express = require('express');
const router = express.Router();
const evaluacionesController = require('../controllers/evaluacionesController');

router.post('/', evaluacionesController.crearEvaluacion);
router.get('/', evaluacionesController.obtenerEvaluaciones);
router.put('/:id', evaluacionesController.actualizarEvaluacion);
router.delete('/:id', evaluacionesController.eliminarEvaluacion);

module.exports = router;
