// taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Route to render the tasks page
router.get('/tasks', taskController.getTasks);

// Route to render the "Add Task" page
router.get('/tasks/new', taskController.getAddTask);

// Route to handle adding a new task
router.post('/tasks', taskController.addTask);

// Route to handle deleting a task
router.get('/tasks/delete/:id', taskController.deleteTask);

module.exports = router;