const express = require('express');
const router = express.Router();

router.get('/todolist', (req, res) => {
    res.render('todolist'); // Render the EJS view
});

module.exports = router;