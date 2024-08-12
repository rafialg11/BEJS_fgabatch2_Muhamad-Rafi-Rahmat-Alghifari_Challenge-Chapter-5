const express = require('express');
const router = express.Router();
const authController = require('../../controllers/v1/auth.controller');

router.post('/login', authController.login);

module.exports = router;