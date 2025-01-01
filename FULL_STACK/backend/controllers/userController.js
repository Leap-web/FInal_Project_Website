const User = require('../model/userModel');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.getByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = { id: user.id, email: user.email }; // Set session.user
        res.redirect('/todolist');
    } else {
        res.render('auth/login', { error: 'Invalid email or password' });
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