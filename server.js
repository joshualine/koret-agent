const express = require('express')
const connectDB = require('./config/mongo-db')
require('dotenv').config()

const authRoute = require("./routes/auth");   //Import Authentication Routes
const propRoute = require('./routes/property');  //Import Property Routes
const userRoute = require('./routes/users');  //Import User Route


connectDB();

const app = express(); //Initialize express

// Middlewares
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/property", propRoute);
app.use('/api/users', userRoute)





const port = process.env.PORT
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
