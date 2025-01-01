require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/adminRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const todolistRoutes = require('./routes/todolistRoutes');

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/', indexRoutes);
app.use(adminRoutes);
app.use(taskRoutes);
app.use(userRoutes);
app.use(todolistRoutes);

// Set views directory
app.set('views', path.join(__dirname, 'views'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});