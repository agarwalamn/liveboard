require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const { Server } = require('socket.io');

const http = require('http');
app.use(cors());
const server = http.createServer(app);
const {
  addUser,
  getUser,
  removeUser,
  getUsersInRoom,
} = require('./utils/users');

// const io = socket(server);
const io = new Server(server, {
  cors: {
    origin: '*:*',
    methods: ['GET', 'POST'],
  },
});
//handlers
const connectionHandler = (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room);
    socket.broadcast.to(user.room).emit('notification', {
      message: `👽 ${user.name} hooped in the server`,
    });
    const users = getUsersInRoom(user.room);
    io.to(user.room).emit('users', users);
    callback();
  });

  socket.on('drawing', (data) => {
    const user = getUser(socket.id);
    if (!user) return; //needs to be fixed
    io.to(user.room).emit('drawing', data); //Broadcast Drawing to other clients
    console.log('emmiting', user.room);
  });

  socket.on('sharecursor', (data) => {
    const user = getUser(socket.id);
    if (!user) return; //needs to be fixed
    io.to(user.room).emit('sharecursor', data); //Broadcast Drawing to other clients
    console.log('sharecursor', user.room, user);
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
    const user = getUser(socket.id);
    console.log(user);
    removeUser(socket.id);
    if (user) {
      socket.broadcast.to(user.room).emit('notification', {
        message: `👽 ${user.name} left the server`,
      });
      const users = getUsersInRoom(user.room);
      io.to(user.room).emit('users', users);
    }
  });
};
//IO
io.on('connection', connectionHandler);
//Server Run
const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`server is running on port ${port}`));

console.log(process.env.PORT);
