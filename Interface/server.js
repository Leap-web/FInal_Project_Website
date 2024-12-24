require('dotenv').config()
const express = require('express');
const app = express();
const session = require('express-session');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.set('view engine','ejs');

const PORT = process.env.PORT || 3000;

app.use('/uploads', express.static('public/uploads'));
app.use('/product',productRoutes);

app.listen(PORT,()=>{
    console.log("server is running on port "+PORT);
});