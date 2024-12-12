const express = require('express'); // Importa el módulo express para crear rutas
const router = express.Router(); // Crea una nueva instancia del enrutador de Express
const evaluacionesController = require('../controllers/evaluacionesController'); // Importa el controlador de evaluaciones

// Define la ruta para crear una nueva evaluación
router.post('/', evaluacionesController.crearEvaluacion); 
// POST /: Llama al método 'crearEvaluacion' del controlador para manejar la creación de evaluaciones

// Define la ruta para obtener todas las evaluaciones
router.get('/', evaluacionesController.obtenerEvaluaciones); 
// GET /: Llama al método 'obtenerEvaluaciones' del controlador para manejar la recuperación de evaluaciones

// Define la ruta para actualizar una evaluación específica por ID
router.put('/:id', evaluacionesController.actualizarEvaluacion); 
// PUT /:id: Llama al método 'actualizarEvaluacion' del controlador para manejar la actualización de una evaluación específica

// Define la ruta para eliminar una evaluación específica por ID
router.delete('/:id', evaluacionesController.eliminarEvaluacion); 
// DELETE /:id: Llama al método 'eliminarEvaluacion' del controlador para manejar la eliminación de una evaluación específica

// Exporta el enrutador para que pueda ser usado en otros archivos
module.exports = router;
