const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bcrypt = require('bcryptjs'); // Import bcrypt
const User = require('../model/userModel'); // Import User model


// Authentication routes
router.get('/login', (req, res) => res.render('auth/login', { user: req.session.user, error: null })); // Render login page
// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.getByEmail(email); // Fetch user from the database
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = { id: user.id, name: user.name, email: user.email }; // Store user data in the session
        res.redirect('/');
    } else {
        res.render('auth/login', { error: 'Invalid email or password' });
    }
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Could not log out');
        }
        res.redirect('/');
    });
});

// GET /register route
router.get('/register', (req, res) => {
    const error = req.query.error || null; // Get error from query params (if any)
    res.render('auth/register', { user: req.session.user, error }); // Pass error to the template
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check for missing fields
    if (!name || !email || !password) {
        return res.render('auth/register', { user: req.session.user, error: 'All fields are required' });
    }

    try {
        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Create the user in the database
        await User.create({ name, email, password: hashedPassword });

        // Redirect to login page after successful registration
        res.redirect('/login');
    } catch (error) {
        console.error('Registration error:', error);
        res.render('auth/register', { user: req.session.user, error: 'Registration failed. Please try again.' });
    }
});

module.exports = router;