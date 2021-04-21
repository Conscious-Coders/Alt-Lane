const verifyToken = require('./middleware/verifytoken')
const {getUserById, getMentorship, addUser} = require('./utils/chatUsers')

const setupSocketIO = (server) => {
    
    const io = require('socket.io')(server, {
        cors: {origin: 'http://localhost:3000',
      
          credentials: true,
      
          methods: ['GET', 'POST']
        }
      })
    //   var socket = io.connect();
    //     console.log('check 1', socket.connected);
    //     socket.on('connect', function() {
    //     console.log('check 2', socket.connected);
    // });

      io.use((socket, next) => {
        verifyToken(socket.request, socket.request.res, next)
        
        next()
      })
        // server-side
       
        io.on('connection', async socket => {
          const userId = socket.request.userId

          if(!userId) {
              console.log(`returning early, no user id`)
              return;
          }

        //   console.log(userId, 'line 31')
          const user = await getUserById(userId)

          if(!user) {
              console.log(`no user, returning early`)
              return;
          }
        
           const mentorshipIds = await getMentorship(user)

           console.log(mentorshipIds)
          
          // get all the user's mentors OR mentees
          //ie getting the mentorship relationships
            mentorshipIds.forEach(mentorOrMentee => {
            //     socket.on('join', async ({user}, callback) =>{
            //         const {error, userInRoom} = await addUser({id: user.user_id, name: user.first_name, room:`${mentorOrMentee}-${user.user_id}`});
            //         if(error) return callback(error);
            //         console.log(userInRoom)
            //         socket.emit('message', {user: 'admin', text: `${userInRoom.name}, welcome to the room ${userInRoom.room}`});
            //         socket.broadcast.to(userInRoom.room).emit('message', {user: 'admin', text: `${userInRoom.name}, has joined!`});
            //         socket.join(userInRoom.room);
                
            //         io.to(userInRoom.room).emit('roomData', {room: userInRoom.room})
            //         callback();
            //       })
             })
           
        
         
          //socket.on('join', ())
          // foreach person in that list, join a room
          // that has a name of `${mentee.id}${mentee.name}${mentor.id}${mentor.name}`
          socket.on('incoming-message', (data) => {
        //   console.log('receiving message', data)
          socket.broadcast.emit('new message', data)
        })
      
        socket.on('disconnect', () => {
          console.log('client went offline')
        })

        // socket.on('join', ({name, room}, callback) =>{
        //     const {error, user} = addUser({id: socket.id, name, room});
        //     if(error) return callback(error);
        
        //     socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        //     socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name}, has joined!`});
        //     socket.join(user.room);
        
        //     io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
        //     callback();
        //   })
        //   socket.on('sendMessage', (message, callback) => {
        //     const user = getUser(socket.id);
        //     io.to(user.room).emit('message', {user: user.name, text: message});
        //     io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)});
        //     callback();
        //   })
        //   socket.on('disconnect', () => {
        //     const user = removeUser(socket.id);
        
        //     if(user){
        //       io.to(user.room).emit('message', {user: 'admin', text: `${user} has left.`})
        //     }
        //   })
        // })

    })
   
}

module.exports = setupSocketIO