const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Authentication routes
router.get('/login', (req, res) => res.render('auth/login', { user: req.session.user, error: null })); // Render login page
router.post('/login', userController.login); // Handle login form submission
router.get('/register', (req, res) => {
    const user = req.session.user || null; // Handle undefined session.user
    res.render('auth/register', { user });
});
router.post('/register', userController.register); // Handle registration form submission
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/todolist');
        }
        res.clearCookie('sid');
        res.redirect('/');
    });
});

module.exports = router;