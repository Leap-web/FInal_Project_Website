require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const adminRoutes = require('./routes/adminRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const todolistRoutes = require('./routes/todolistRoutes'); // Include the todolist routes
const path = require('path');

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'mysecret', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Routes
app.use(adminRoutes);
app.use(taskRoutes);
app.use(userRoutes);
app.use(todolistRoutes); // Use the todolist routes

// Set views directory
app.set('views', path.join(__dirname, 'views')); // Ensure this points to the correct views directory

// Start the server
const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not defined
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});