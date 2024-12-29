const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Task routes
router.get('/tasks', taskController.getTasks);
router.get('/tasks/new', (req, res) => res.render('user/addTask'));
router.post('/tasks', taskController.addTask);
router.get('/tasks/delete/:id', taskController.deleteTask);

module.exports = router;