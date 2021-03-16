require("dotenv").config();

const express = require("express");
const queueManager = require("./connector/rabbit");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const actionManager = require("./services/actionManager.service");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

queueManager.start("stocks", (msg, cb) => {
  try {
    const obj = JSON.parse(msg.content.toString());
    if (!obj.domain || !obj.action) return cb();
    actionManager[obj.domain][obj.action](obj.stockCode, obj.messages);
    cb(true);
  } catch (err) {
    console.error(`Error -> ${err}`);
    return cb();
  }
});

const index = require("./routes/index");
app.use("/", index);

module.exports = app;
