const users = [];

const addUser = ({ id, name, room }) => {
  if (!name || !room) return { error: 'Username and room are required.' };

  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (getuserInRoom(name, room)) return { error: 'Username is taken.' };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (id) => users.find((user) => user.id === id);
const getuserInRoom = (name, room) =>
  users.find((user) => user.name === name && user.room === room);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
