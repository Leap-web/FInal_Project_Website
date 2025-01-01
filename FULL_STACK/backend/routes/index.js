const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const user = req.session.user || null; // Handle undefined session.user
    res.render('index', { user });
});

module.exports = router;