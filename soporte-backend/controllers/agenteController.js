// soporte-backend/controllers/agenteController.js
const Agente = require('../models/Agente');
const bcrypt = require('bcryptjs');

// Registrar un nuevo agente
exports.registrarAgente = async (req, res) => {
  try {
    const {
      nombreCompleto,
      idFiscal,
      telefono,
      whatsappVerificado,
      fechaNacimiento,
      genero,
      pais,
      tiposAgenteSeleccionados,
      experiencia,
      habilidades,
      idiomas,
      otroIdioma
    } = req.body;

    // Obtener el ID del usuario del token
    const userId = req.user.id;

    // Crea un nuevo agente con los datos del formulario
    const agente = new Agente({
      userId,
      nombreCompleto,
      idFiscal,
      telefono,
      whatsappVerificado,
      fechaNacimiento,
      genero,
      pais,
      tiposAgenteSeleccionados,
      experiencia,
      habilidades,
      idiomas,
      otroIdioma
    });

    await agente.save();
    res.status(201).json({ message: 'Datos de agente registrados exitosamente' });
  } catch (error) {
    console.error('Error al registrar el agente:', error);
    res.status(500).json({ message: 'Error al registrar datos del agente', error: error.message });
  }
};

// Obtener los datos del agente autenticado
exports.obtenerDatosAgente = async (req, res) => {
  try {
    const agente = await Agente.findOne({ userId: req.user.id });
    if (!agente) {
      return res.status(404).json({ message: 'Agente no encontrado' });
    }
    res.json(agente);
  } catch (error) {
    console.error('Error al obtener los datos del agente:', error);
    res.status(500).json({ message: 'Error al obtener los datos del agente' });
  }
};

// Actualizar los datos del agente autenticado
exports.actualizarDatosAgente = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10); // Encripta la contraseña si es proporcionada
    }

    const agente = await Agente.findOneAndUpdate(
      { userId: req.user.id },
      updates,
      { new: true }
    );

    if (!agente) {
      return res.status(404).json({ message: 'Agente no encontrado' });
    }

    res.json({ message: 'Datos actualizados con éxito', agente });
  } catch (error) {
    console.error('Error al actualizar los datos del agente:', error);
    res.status(500).json({ message: 'Error al actualizar los datos del agente', error: error.message });
  }
};

//verificar que el agente esta registrado
exports.verificarAgente = async (req, res) => {
  try {
    const userId = req.user.id; // Obtener el ID del usuario del token
    const agente = await Agente.findOne({ userId }); // Buscar al agente por el ID del usuario
    res.status(200).json({ registrado: !!agente }); // Retornar true si el agente existe, false si no
  } catch (error) {
    console.error('Error al verificar el agente:', error);
    res.status(500).json({ message: 'Error al verificar el agente' });
  }
};
