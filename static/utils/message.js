const moment = require('moment')
function formatMessage(username,Text){
return {
    username,
    Text,
    time:moment().format('h:mm a')
}

}

module.exports=formatMessage