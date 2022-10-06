const app = require("express");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("message", ({ name, message, room }) => {
    io.emit("message", { name, message, room });
    console.log(room + "의 " + name, ":", message);
  });
});

server.listen(3001, function () {
  console.log("listening on port 3001");
});
