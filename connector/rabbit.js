const amqp = require("amqplib");
const queueManager = {};

queueManager.startPublisher = (queue) => {
  // Publisher
  amqp
    .connect(process.env.RABBITMQ_URL)
    .then((conn) => conn.createChannel())
    .then(async (ch) => {
      await ch.assertQueue(queue);
      return ch.sendToQueue(queue, Buffer.from("something to do"));
    })
    .catch(console.warn);
};

module.exports = queueManager;
