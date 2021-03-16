const amqp = require("amqplib");
const queueManager = {};

queueManager.start = (queue, callback) => {
  amqp
    .connect(process.env.RABBITMQ_URL)
    .then((conn) => {
      queueManager.amqpConn = conn;
      return conn.createChannel();
    })
    .then(async (ch) => {
      const processMsg = (msg) => {
        callback(msg, (ok) => {
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

module.exports = queueManager;
