const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// Middleware for overriding methods
const methodOverride = require('method-override');
router.use(methodOverride('_method'));

// router.get('/login',userController.login);