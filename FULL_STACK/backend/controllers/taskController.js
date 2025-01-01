// taskController.js
const Task = require('../model/taskModel');

exports.getTasks = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const tasks = await Task.getAll(req.session.user.id);
    res.render('user/tasks', { user: req.session.user, tasks });
};

exports.getAddTask = (req, res) => {
    res.render('user/addTask', { user: req.session.user || null });
};

// taskController.js
exports.addTask = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect to login if user is not logged in
    }
    const userId = req.session.user.id;
    const { title, description, status = 'Pending', due_date } = req.body;
    await Task.create({ user_id: userId, title, description, status, due_date });
    res.redirect('/tasks');
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    await Task.delete(id);
    res.redirect('/tasks');
};