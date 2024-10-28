const express = require('express');
const { getFaqs, createFaq, updateFaq, deleteFaq } = require('../controllers/faqController');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

// Obtener todas las FAQs
router.get('/faqs', verifyToken, getFaqs);

// Crear una nueva FAQ
router.post('/faqs', verifyToken, createFaq);

// Actualizar una FAQ existente
router.put('/faqs/:id', verifyToken, updateFaq);

// Eliminar una FAQ
router.delete('/faqs/:id', verifyToken, deleteFaq);

module.exports = router;
