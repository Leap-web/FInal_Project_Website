const Task = require('../model/taskModel');

exports.getTasks = async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const tasks = await Task.getAll(req.session.user.id); 
    res.render('user/tasks', { tasks });
};

exports.addTask = async (req, res) => {
    const { title, description, status = 'Pending' } = req.body;
    await Task.create({ user_id: req.session.user.id, title, description, status });
    res.redirect('/tasks');
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    await Task.delete(id);
    res.redirect('/tasks');
};
