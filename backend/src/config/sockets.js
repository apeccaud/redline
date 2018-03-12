const socketIo = require('socket.io');

const socketServer = {
  init(server) {
    this.io = socketIo(server);
    this.io.on('connection', (socket) => {
      // socket.join('default');
      console.log(socket);
      console.log('A user connected');
    });
  },
  emit(...args) {
    // this.io.to('default').emit(...args);
    this.io.emit(...args);
  },
};

module.exports = socketServer;
