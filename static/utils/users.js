var users = []

function addUser(username,room,id)
{
    const users_info = {username,room,id}
    users.push(users_info)
    console.log(users)
    return users_info;
}
function getCurrentUser(id){
    return users.find(user => user.id===id)
}

function removeUser(id)
{
const index = users.findIndex(user => user.id===id);
    // console.log(index,users.splice(index,1))
        if(index!==-1)
        {
            return users.splice(index,1)[0]
        }
    
    
}
function getUsers(room)
{
    return users.filter(user=>user.room===room)
}


module.exports = {addUser,getCurrentUser,removeUser,getUsers};