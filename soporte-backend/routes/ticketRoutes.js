const express = require('express');
const { createTicket, getTickets, getTicketById, updateTicket, deleteTicket } = require('../controllers/ticketController');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

// Crear un ticket
router.post('/', verifyToken, createTicket);

// Obtener todos los tickets
router.get('/', verifyToken, getTickets);

// Obtener un ticket por ID
router.get('/:id', verifyToken, getTicketById);

// Actualizar un ticket por ID
router.put('/:id', verifyToken, updateTicket);

// Eliminar un ticket por ID
router.delete('/:id', verifyToken, deleteTicket);

module.exports = router;