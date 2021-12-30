const express = require('express')
const connectDB = require('./config/mongo-db')
require('dotenv').config()

// Importing routes
const userRoutes = require('./routes/user.route') //user routes

connectDB();

const app = express(); //Initialize express

// Middlewares
app.use(express.json());


// Using routes
app.use('/api/users', userRoutes);





const port = process.env.PORT
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})