const http = require("http");
let app = require("../app");
const socketService = require("../services/socketConnection.service");

// catch 404 and render a not-found.hbs template
app.use((req, res, next) => {
  res.status(404);
  res.render("not-found");
});

app.use((err, req, res, next) => {
  // always log the error
  console.error("ERROR", req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render("error");
  }
});

let server = http.createServer(app);
socketService.start(server);

server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`Port ${process.env.PORT} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`Port ${process.env.PORT} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
});

server.listen(process.env.PORT, () => {
  console.log(
    `Listening on ${process.env.SERVER_URL}:${process.env.PORT || 3000}`
  );
});
