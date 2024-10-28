const express = require('express');
const { getFaqs, createFaq, updateFaq, deleteFaq } = require('../controllers/faqController');
const verifyToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Obtener todas las FAQs (GET)
router.get('/', verifyToken, getFaqs);

// Crear una nueva FAQ (POST)
router.post('/', verifyToken, createFaq); // Debe ser router.post('/')

// Actualizar una FAQ existente (PUT)
router.put('/:id', verifyToken, updateFaq);

// Eliminar una FAQ (DELETE)
router.delete('/:id', verifyToken, deleteFaq);

module.exports = router;