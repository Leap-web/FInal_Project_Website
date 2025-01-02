const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Authentication routes
router.get('/login', (req, res) => res.render('auth/login', { user: req.session.user, error: null })); // Render login page
router.post('/login', userController.login); // Handle login form submission
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/todolist');
        }
        res.clearCookie('sid');
        res.redirect('/');
    });
});

// GET /register route
router.get('/register', (req, res) => {
    const error = req.query.error || null; // Get error from query params (if any)
    res.render('auth/register', { user: req.session.user, error }); // Pass error to the template
});

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.render('auth/register', { user: req.session.user, error: 'All fields are required' });
    }
    res.render('auth/register', { user: req.session.user, error: 'Registration failed. Please try again.' });
});

module.exports = router;