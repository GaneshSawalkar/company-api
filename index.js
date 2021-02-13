const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

// connect to db
mongoose.connect(
  process.env.CONNECT_DB,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected to db")
);

// Middlewares

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


// route Middlewares
 app.use("/api", require("./routes/listing"));

app.listen(4000, () => console.log("server up and runing on port 4000!"));
