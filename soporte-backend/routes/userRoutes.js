const express = require('express');
const { register, login, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

// Registrar un nuevo usuario
router.post('/registro', register);

// Iniciar sesión
router.post('/login', login);

// Obtener un usuario por ID
router.get('/:id', verifyToken, getUserById);

// Actualizar un usuario por ID
router.put('/:id', verifyToken, updateUser);

// Eliminar un usuario por ID
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;
