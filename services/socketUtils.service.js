const onMessage = (io, msg, messages) => {
  const command = msg.match(/^(\/stock=)/);
  if (command) {
    const stockCode = msg.split("=")[1];
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
};

module.exports = {
  onMessage,
};
