const socket = io();
const chatMessagesHeight = document.querySelector('.chat-messages').scrollHeight
// console.log(.)

// Get Username and room
const {username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
})

//Join room

socket.emit('join-room',{username,room})


socket.on('message',(msg)=>{
    // console.log(msg,)
    outputMessage(msg);
    // scroll down
    $(".chat-messages").scrollTop(10000)
}) 

// DOM
$("#chat-form").on('submit',(e)=>{
e.preventDefault()

// console.log($("#msg").val())
socket.emit('chat_msg',$("#msg").val())
// Clear inputs
$("#msg").value = ''
$("#msg").focus()
})

// Change User and room_info

socket.on('user_and_room_info',({room,users})=>{
    
    console.log("userInfo",users,room)
    $("#room-name").text(room)
    $('#users').empty()

    for(var i =0;i<users.length;i++)
    {
        console.log(users[i].username)
        
        $("#users").append(

            $("<li>").text(users[i].username)
        )   
    }
     

})

// Set DOM message
function outputMessage(msg){
    // const {username,text,time} = msg
    $(".chat-messages").append(`<div class="message">
    <p class="meta">${msg.username} <span>${msg.time}</span></p>
    <p class="text">
        ${msg.Text}
    </p>
</div>`)

}