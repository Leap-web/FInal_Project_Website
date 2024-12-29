const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Authentication routes
router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login', userController.login);
router.get('/register', (req, res) => res.render('auth/register'));
router.post('/register', userController.register);

module.exports = router;