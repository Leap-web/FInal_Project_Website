const User = require('../model/userModel');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.getByEmail(email);  
    if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user; // Store user in session
        res.redirect('/tasks');
    } else {
        res.render('auth/login', { error: 'Invalid credentials' });
    }
};

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    await User.create({ name, email, password: hashedPassword });
    res.redirect('/login');
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};
