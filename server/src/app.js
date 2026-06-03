const express = require("express")
const cors = require("cors")

const app = express()

// importing routes
const authRoute = require("./routes/auth.route")
const productRoute = require("./routes/product.route")


app.use(express.json());
app.use(cors({
  origin: true,
  credentials: true
}));

//use route
app.use("/v1/api/login", authRoute);
app.use("/v1/api/product", productRoute);


module.exports = app;