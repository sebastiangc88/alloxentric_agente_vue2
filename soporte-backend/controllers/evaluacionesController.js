const Evaluacion = require('../models/Evaluacion');

// Crear nueva evaluación
exports.crearEvaluacion = async (req, res) => {
  try {
    const nuevaEvaluacion = new Evaluacion(req.body);
    const evaluacionGuardada = await nuevaEvaluacion.save();
    res.status(201).json(evaluacionGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear la evaluación', error });
  }
};

// Obtener todas las evaluaciones
exports.obtenerEvaluaciones = async (req, res) => {
  try {
    const evaluaciones = await Evaluacion.find();
    res.status(200).json(evaluaciones);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al obtener las evaluaciones', error });
  }
};

// Actualizar evaluación
exports.actualizarEvaluacion = async (req, res) => {
  try {
    const evaluacionActualizada = await Evaluacion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(evaluacionActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar la evaluación', error });
  }
};

// Eliminar evaluación
exports.eliminarEvaluacion = async (req, res) => {
  try {
    await Evaluacion.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: 'Evaluación eliminada correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar la evaluación', error });
  }
};
