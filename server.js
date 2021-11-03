const express = require('express')
const connectDB = require('./database/db')
require('dotenv').config()


const authRoute = require("./routes/auth");


connectDB();

const app = express(); //Initialize express

// Middlewares
app.use(express.json());

app.use("/api/auth", authRoute);


const port = process.env.PORT
app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})
