require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const adminRoutes = require('../backend/routes/adminRoutes');
const taskRoutes = require('../backend/routes/taskRoutes');
const userRoutes = require('../backend/routes/userRoutes');
const path = require('path');

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true }));

// Routes
app.use(adminRoutes);
app.use(taskRoutes);
app.use(userRoutes);

// Start the server
const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not defined
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const todolistRoutes = require('./routes/todolistRoutes'); // Adjust the path as necessary
app.use(todolistRoutes);
app.set('views', path.join(__dirname, 'views')); // Ensure you have 'path' imported