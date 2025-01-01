const User = require('../model/userModel');

exports.getAdminDashboard = async (req, res) => {
    // Check if the user is authenticated and has the 'admin' role
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.redirect('/login'); // Redirect to login if not an admin
    }

    // Fetch all users (or other admin-specific data)
    const users = await User.getAll();
    res.render('admin/dashboard', { users }); // Render the admin dashboard
};

exports.deleteUser  = async (req, res) => {
    const { id } = req.params;
    await User.delete(id);
    res.redirect('/admin'); // Redirect back to the admin dashboard after deletion
};