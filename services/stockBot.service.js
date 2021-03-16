const axios = require("axios");
const csv = require("csvtojson/v2");
const socketBot = {};
const queueManager = require("../connector/rabbit");

socketBot.requestCSV = (endpoint, stockCode) =>
  new Promise((resolve, reject) => {
    axios
      .get(`${endpoint}?s=${stockCode.toLowerCase()}&f=sd2t2ohlcv&h&e=csv`)
      .then((response) => {
        resolve(socketBot.convertCSVToJson(response.data));
      })
      .catch((err) => {
        reject(err);
      });
  });

socketBot.convertCSVToJson = async (csvFile) => {
  return await csv({ trim: true, delimiter: "," }).fromString(csvFile);
};

socketBot.publishToQueue = (queue, content) => {
  queueManager.publish(queue, content);
};

module.exports = socketBot;
