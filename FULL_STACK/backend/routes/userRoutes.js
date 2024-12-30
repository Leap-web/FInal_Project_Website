const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Authentication routes
router.get('/login', (req, res) => res.render('auth/login', { error: null })); // Render login page
router.post('/login', userController.login); // Handle login form submission
router.get('/register', (req, res) => res.render('auth/register')); // Render register page
router.post('/register', userController.register); // Handle registration form submission

module.exports = router;