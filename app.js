require('dotenv').config()

const express = require("express");
const queueManager = require('./connector/rabbit')
const app = express();
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

queueManager.startPublisher("stocks")

module.exports = app