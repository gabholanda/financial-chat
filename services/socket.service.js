const messages = [];

const start = (server) => {
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    // Load all old messages saved in memory on connection
    socket.emit("load old messages", messages);

    socket.on("chat message", (msg) => {
      const command = msg.match(/\/stocks /g);
      if (command) {
        const stockCode = msg.split(" ")[1];
        // Fire bot and API
      } else {
        messages.push(msg);
        if (messages.length >= 50) {
          messages.slice(0, 1);
          io.emit("chat message", { msg, update: true });
        } else {
          io.emit("chat message", { msg, update: false });
        }
      }
    });
  });
};

module.exports = { start };
