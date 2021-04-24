const verifyToken = require('./middleware/verifytoken')

const URL = process.env.NODE_ENV === 'production' ? 'https://alt-lane.netlify.app' : 'http://localhost:3000'

const setupSocketIO = (server) => {
    
    const io = require('socket.io')(server, {
        cors: {origin: URL,
      
          credentials: true,
      
          methods: ['GET', 'POST']
        }
      })

    const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

      io.use((socket, next) => {
        verifyToken(socket.request, socket.request.res, next)
        
        next()
      })
        // server-side
        io.on('connection', async socket => {

           const { roomId } = socket.handshake.query;
           socket.join(roomId);

            // Listen for new messages
            socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
              io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
            });

            // Leave the room if the user closes the socket
            socket.on("disconnect", () => {
              socket.leave(roomId);
            });
        
        socket.on('disconnect', () => {
          console.log('client went offline')
        })

    })
   
}

module.exports = setupSocketIO