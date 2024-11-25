const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Registrar un nuevo usuario
exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verifica los datos recibidos en el registro
    console.log("Datos recibidos en registro - Nombre:", nombre, "Email:", email);

    // Crear un nuevo usuario; el password será encriptado en el pre-save hook del modelo
    const user = new User({ nombre, email, password });
    await user.save();

    console.log("Usuario registrado exitosamente:", user);
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica el valor del email y la contraseña ingresada
    console.log("Email ingresado:", email);
    console.log("Password ingresado:", password);

    // Busca el usuario por email en la base de datos
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Usuario no encontrado");
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verifica la contraseña con bcrypt.compare
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password guardado en BD:", user.password);
    console.log("Password coincide:", isMatch);

    if (!isMatch) {
      console.log("Contraseña incorrecta");
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generación del token si las credenciales son correctas
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log("Token generado:", token);
    // Incluir el ID de usuario en la respuesta
    res.json({ token, userId: user._id}); 
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    const updateData = { nombre, email };

    if (password) {
      updateData.password = password; // Será encriptado en el pre-save hook
      console.log("Contraseña actualizada");
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    console.log("Usuario actualizado:", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    console.log("Usuario eliminado:", deletedUser);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};
