const status = require('./status');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);
    status(io, socket);
  });
};
