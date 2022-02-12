require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const {
  addUser,
  getUser,
  removeUser,
  getUsersInRoom,
} = require('./utils/users');

const server = () => {
  // intialize
  const app = express();
  const server = http.createServer(app);
  app.use(cors());

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
      if (error) {
        console.log(error);
        return callback(error);
      }

      socket.join(user.room);
      // all users in current room
      const users = getUsersInRoom(user.room);

      // show join notification
      socket.broadcast.to(user.room).emit('notification', {
        message: `👽 ${user.name} hooped in the server`,
      });

      // show users in room
      io.to(user.room).emit('users', users);
      callback();
    });

    // send drawing data to user
    socket.on('drawing', (data) => {
      const user = getUser(socket.id);
      if (!user) return;
      io.to(user.room).emit('drawing', data);
    });

    // share cursor data to users
    socket.on('sharecursor', (data) => {
      const user = getUser(socket.id);
      if (!user) return;
      io.to(user.room).emit('sharecursor', data);
    });

    socket.on('disconnect', () => {
      const user = getUser(socket.id);
      if (!user) return;
      removeUser(socket.id);

      socket.broadcast.to(user.room).emit('notification', {
        message: `👽 ${user.name} left the server`,
      });

      const users = getUsersInRoom(user.room);
      io.to(user.room).emit('users', users);
    });
  };

  io.on('connection', connectionHandler);

  // start server
  server.listen(process.env.PORT || 4000, () =>
    console.log(`server is running on port ${process.env.PORT || 4000}`),
  );

  console.log(process.env.PORT);
};

server();
