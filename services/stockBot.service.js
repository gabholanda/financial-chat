const axios = require("axios");
const csv = require("csvtojson/v2");
const socketBot = {};
const queueManager = require("../connector/rabbit");
let IO;
const botName = "StockBot";

socketBot.requestCSV = (stockCode) =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `${
          process.env.STOCK_URL
        }?s=${stockCode.toLowerCase()}&f=sd2t2ohlcv&h&e=csv`
      )
      .then((response) => resolve(socketBot.convertCSVToJson(response.data)))
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });

socketBot.convertCSVToJson = async (csvFile) => {
  return await csv({ trim: true, delimiter: "," }).fromString(csvFile);
};

socketBot.emitStock = async (stockCode) => {
  const parsedCsvArr = await socketBot.requestCSV(stockCode);
  let msg;
  if (!parsedCsvArr || !parsedCsvArr.length) {
    msg = `${botName}: Something went wrong while trying to get this quote ${stockCode}`;
    IO.emit("chat message", { msg, update: false });
  }

  const jsonData = parsedCsvArr[0];
  // I have no idea on how to calculate quotes
  // so I am just putting a random value from the .csv file here
  if (jsonData.Open == "N/D") {
    msg = `${botName}: I haven't found a quote with this stock code`;
  } else {
    msg = `${botName}: ${jsonData.Symbol} quote is $${jsonData.Open} per share`;
  }
  IO.emit("chat message", { msg, update: false });
};

socketBot.startIO = (io) => {
  IO = io;
};

socketBot.publishToQueue = (queue, content) => {
  queueManager.publish(queue, content);
};

module.exports = socketBot;
