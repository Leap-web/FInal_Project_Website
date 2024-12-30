const User = require('../model/userModel');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.getByEmail(email);  
    if (user && bcrypt.compare (password, user.password)) {
        req.session.user = { id: user.id, email: user.email }; // Store user info in session
        res.redirect('/todolist'); // Redirect to To-Do List after successful login
    } else {
        res.render('auth/login', { error: 'Invalid email or password' }); // Show error on login failure
    }
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    await User.create({ name, email, password: hashedPassword });
    res.redirect('/login');
};

exports.logout = (req, res) => {
    res.clearCookie('connect.sid'); // Clear session cookie
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/tasks');
        }
        res.redirect('/login');
    });
};