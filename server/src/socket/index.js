const socketChat =  require('./chat');

const socketIo = (io) => {
  const chatNameSpace = io.of('/chat').on('connection', (socket) => {
    socketChat.respond(socket);
  })
  
  chatNameSpace.use((socket, next) => {
    next();

    // if (socket.handshake.auth && socket.handshake.auth.token) {
    //   const token = socket.handshake.auth.token;
    //   next();
    // } else {
    //   next(new Error('invalid'));
    //   console.log('Auth token error')
    // }

  })
}

module.exports = socketIo;