const User = require('../model/userModel');

exports.getAdminDashboard = async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login');
    }

    const users = await User.getAll();
    res.render('user/adminDashboard', { users });
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.delete(id);
    res.redirect('/admin');
};
