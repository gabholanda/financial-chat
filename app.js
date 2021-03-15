require("dotenv").config();

const express = require("express");
const queueManager = require("./connector/rabbit");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

queueManager.startPublisher("stocks");

const index = require("./routes/index");
app.use("/", index);

module.exports = app;
