const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const users = require("./users.js");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("new-user-joined", ({ name }) => {
    users[socket.id] = name.trim();
    // console.log(`${name} joined the chat`);
    socket.broadcast.emit("new-user-joined", { name });
  });

  socket.on("send", ({ name, content }) => {
    socket.broadcast.emit("recieve", { name, content });
  });

  socket.on("userDisconnect", ({ name }) => {
    socket.broadcast.emit("user-left", { name });
    delete users[socket.id];
  });

  socket.on("disconnect", () => {
    const name = users[socket.id];
    socket.broadcast.emit("user-left", { name });
    delete users[socket.id];
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/users", (req, res) => {
  res.json(users);
});

server.listen(process.env.PORT || 8000, () => {
  console.log("Listening on port 8000");
});
