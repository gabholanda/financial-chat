const socketBot = require("./stockBot.service");

const onMessage = (io, data, messages) => {
  const msg = `${data.nickname}: ${data.content}`;
  messages.push(msg);
  const command = data.content.match(/^(\/stock=)/);
  if (command) {
    const stockCode = data.content.split("=")[1];
    const content = {
      action: "emitStock",
      domain: "socketBot",
      stockCode,
      messages,
    };
    socketBot.publishToQueue("stocks", content);
  }

  if (messages.length >= 50) {
    messages.slice(0, 1);
    io.emit("chat message", { msg, update: true });
  } else {
    io.emit("chat message", { msg, update: false });
  }
};

module.exports = {
  onMessage,
};
