const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const questionsRoutes = require("./routes/questions");
const path = require("path");
require("dotenv").config();

// app.set("view engine" , "ejs");

// const frontendpath = path.join(__dirname,'./Frontend')

const app = express();

app.use(cors());

app.use(express.json());

// Routes
app.use("/user", userRoutes);
app.use("/questions", questionsRoutes);


//handle error
app.use((error, req, res, next) => {
  console.log({ error });
  const statuscode = error.statuscode || 500;
  const message = error.message || "Internal Server Error";
  res
    .status(statuscode)
    .json({ from: "ErrorHandling Mid", error: error.message });
  console.log(error);
});

app.use("*", (req, res, next) => {
  res.sendStatus(404);
});

module.exports = { app };
