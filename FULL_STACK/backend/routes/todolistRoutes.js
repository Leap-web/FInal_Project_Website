const express = require('express');
const router = express.Router();
const Task = require('../model/taskModel'); // Import your Task model

router.get('/todolist', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }
    const tasks = await Task.getAll(req.session.user.id); // Fetch tasks for the logged-in user
    res.render('user/tasks', { user: req.session.user, tasks }); // Pass the user object
});

// Route to add a new task
router.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    await Task.create({ user_id: req.session.user.id, title, description }); // Create a new task
    res.redirect('/todolist'); // Redirect to the To-Do List page
});

// Route to delete a task
router.post('/tasks/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.delete(id); // Delete the task by ID
    res.redirect('/todolist'); // Redirect to the To-Do List page
});

module.exports = router;