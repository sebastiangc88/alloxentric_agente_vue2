// controllers/bancoController.js
const Banco = require('../models/Banco'); // Importa el modelo Banco desde la carpeta models

// Controlador para guardar datos bancarios
exports.guardarDatosBancarios = async (req, res) => {
  try {
    // Obtiene el agente_id desde los parámetros de la URL
    const agente_id = req.params.agente_id;
    // Desestructura los campos banco, tipoCuenta y numeroCuenta del cuerpo de la solicitud
    const { banco, tipoCuenta, numeroCuenta } = req.body;

    // Crea una nueva instancia del modelo Banco con los datos proporcionados
    const nuevosDatos = new Banco({
      agente_id, 
      banco, 
      tipoCuenta, 
      numeroCuenta, 
    });

    // Guarda los nuevos datos bancarios en la base de datos
    await nuevosDatos.save();
    res.status(201).json({ message: 'Datos bancarios guardados exitosamente' });
  } catch (error) {
    // Maneja cualquier error que ocurra durante el proceso
    console.error("Error al guardar datos bancarios:", error); 
    // Envía una respuesta de error con un código de estado 500
    res.status(500).json({ message: 'Error al guardar datos bancarios' });
  }
};
