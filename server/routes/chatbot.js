const express = require('express');
const router = express.Router();
const { chatWithBot } = require('../controllers/chatbot');

router.post('/', chatWithBot);

module.exports = router;
