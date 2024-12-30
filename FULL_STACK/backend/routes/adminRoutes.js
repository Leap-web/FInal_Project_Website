const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin routes
router.get('/admin', adminController.getAdminDashboard);
router.post('/admin/users/delete/:id', adminController.deleteUser );

module.exports = router;