const start = (server) => {
  const io = require("socket.io")(server);
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("chat message", (msg) => {
      io.emit("chat message", msg);
    });
  });
};

module.exports = { start };
