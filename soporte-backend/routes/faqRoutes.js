const express = require('express');
const { getFaqs, createFaq } = require('../controllers/faqController');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', verifyToken, getFaqs);
router.post('/', verifyToken, createFaq);

module.exports = router;
