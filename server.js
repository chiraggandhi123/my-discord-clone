const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./static/utils/message')
const {addUser,getCurrentUser,removeUser,getUsers} = require('./static/utils/users')
const app = express()
const server = app.listen(4444)
const io = socketio.listen(server,()=>{
    console.log('Server is running on http://localhost:4444')
})
const ChatBOT = "chateu_bot"
const PORT = process.env.PORT || 4444
// Set static 
app.use(express.static(__dirname + '/static'))

// Get username and room info
// When a client connects 
io.on('connection',(socket)=>{
    // Join room
    socket.on('join-room',({username,room})=>{
        const user = addUser(username,room,socket.id)
        socket.join(user.room)
        
        socket.broadcast.to(user.room).emit('message',formatMessage(ChatBOT,`${user.username} has joined`))
        const AllUsers = getUsers(user.room)
        console.log("ALl users  ",AllUsers)
        io.to(user.room).emit('user_and_room_info',{
            
            room:user.room,
            users:AllUsers
        })
         //Recieve msg from clients
        socket.on('chat_msg',(msg)=>{
        
        const user = getCurrentUser(socket.id)
        
        io.to(user.room).emit('message',formatMessage(user.username,msg));
    })

    })
    socket.emit('message',formatMessage(ChatBOT,'Welcome to Chateau'))
    // BroadCast -> Send message to everyone except user
    
    
    socket.on('disconnect',()=>{
        // Send message to everyone
        const user = removeUser(socket.id)
        // console.log(user)
        if(user)
        {
             io.to(user.room).emit('message',formatMessage(ChatBOT, `${user.username} has left the chat`))
        }
        const AllUsers = getUsers(user.room)

        io.to(user.room).emit('user_and_room_info',{
            
            room:user.room,
            users:AllUsers
        })

})
})

