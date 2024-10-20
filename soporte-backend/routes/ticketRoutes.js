const express = require('express');
const { createTicket, getTickets } = require('../controllers/ticketController');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

router.post('/', verifyToken, createTicket);
router.get('/', verifyToken, getTickets);

module.exports = router;
