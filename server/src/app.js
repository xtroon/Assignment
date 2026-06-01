const express = require("express")
const cors = require("cors")

const app = express()

// importing routes
const authRoute = require("./routes/auth.route")


app.use(express.json());
app.use(cors())

//use route
app.use("/v1/api/login", authRoute);



module.exports = app;