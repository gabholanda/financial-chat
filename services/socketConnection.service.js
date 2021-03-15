const messages = [];
const socketUtils = require("./socketUtils.service");

const start = (server) => {
  const io = require("socket.io")(server);
  io.on("connection", (socket) => {
    // Load all old messages saved in memory on connection
    socket.emit("load old messages", messages);

    socket.on("chat message", (msg) => {
      socketUtils.onMessage(io, msg, messages);
    });
  });

  return io;
};

module.exports = { start };
