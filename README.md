# Financial Chat


## Installation
Create a queue called "stocks" on RabbitMQ Management and then run the following command on the terminal in the project's root folder:

```bash
npm install
```

## Environment
Create a .env file in the project's root folder and put these in it:

``` bash
PORT=3000
RABBITMQ_URL = amqp://localhost
SERVER_URL= localhost
STOCK_URL = https://stooq.com/q/l/
 ```

## What wasn't done

- Have the chat messages ordered by their timestamps (So if the client has a bad connection and takes way too long to send the message, it will not sort it by the sending timestamp)

- show only the last 50
messages(It's not working 100% because firing the command will ignore the 50 messages limitation)

- The bot is also not entirely decoupled

## Bonus

- Handle messages that are not understood or any exceptions raised within the bot. (I handled the obvious returns)

## Final Considerations

Setting the RabbitMQ was exceptionally hard, but very rewarding.

I have never done a chat before and that was a nice experience and I also wish I could have done some tests.

And I did what we from Brazil call "Gambiarra" to connect RabbitMQ with the Bot and the SocketIO.