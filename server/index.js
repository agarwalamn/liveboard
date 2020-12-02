const express = require("express");
const app = express();
const cors = require("cors");

const http = require("http");
app.use(cors());
const server = http.createServer(app);
const socket = require("socket.io");
const { addUser, getUser } = require("./utils/users");

const io = socket(server);
io.origins("*:*");
//handlers
const connectionHandler = (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log(user);
    if (error) return callback(error);

    socket.join(user.room);
    socket.broadcast
      .to(user.room)
      .emit("notification", { message: `${user.name} joined the party` });
    callback();
  });

  socket.on("drawing", (data) => {
    const user = getUser(socket.id);
    if (!user) return; //needs to be fixed
    io.to(user.room).emit("drawing", data); //Broadcast Drawing to other clients
    console.log("emmiting", user.room);
  });
};
//IO
io.on("connection", connectionHandler);
//Server Run
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`server is running on port ${port}`));
