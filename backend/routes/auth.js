const express = require('express');
const router = express.Router();
const { validateUser } = require('../middleware/validation');
const authController = require('../controllers/authController');
router.post('/register', validateUser, authController.register);
router.post('/login', authController.login);
module.exports = router;
