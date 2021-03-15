const amqp = require("amqplib");
const queueManager = {};

queueManager.start = (queue) => {
  amqp
    .connect(process.env.RABBITMQ_URL)
    .then((conn) => {
      queueManager.amqpConn = conn;
      return conn.createChannel();
    })
    .then(async (ch) => {
      processMsg = (msg) => {
        queueManager.callback(msg, (ok) => {
          try {
            if (ok) ch.ack(msg);
            else ch.reject(msg);
          } catch (e) {
            console.error(e);
          }
        });
      };

      queueManager.pubChannel = ch;
      await ch.assertQueue(queue, { durable: true });
      ch.consume(queue, processMsg, { noAck: false });
    })
    .catch(console.warn);
};

queueManager.publish = (routingKey, content) => {
  queueManager.pubChannel.publish(
    "",
    routingKey,
    Buffer.from(JSON.stringify(content), "utf8"),
    (err) => {
      if (err) {
        console.error(`[AMQP] publish ${err}`);
      }
    }
  );
};

queueManager.callback = (msg, cb) => {
  try {
    const obj = JSON.parse(msg.content.toString());
    cb(true);
  } catch (err) {
    console.error(`Error -> ${err}`);
    return cb(true);
  }
};

module.exports = queueManager;
