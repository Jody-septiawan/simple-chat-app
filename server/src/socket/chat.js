const { chat } = require("../../models")

const getChat = async (socket) => {
    try {

        let data = await chat.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
              }
        })

        data = JSON.parse(JSON.stringify(data))

        socket.emit('message', data);

        console.log(data)

    } catch (error) {
        console.log(error)
    }
}

let interval

module.exports.respond = (socket) => {

    console.log('user connect');

    // if (interval) {
    //     clearInterval(interval)
    // }
    
    interval = setInterval( () => {
        getChat(socket);
    }, 3000);

    socket.on('add message', async (data) => {
        try {
            await chat.create(data)
            getChat(socket);
        } catch (error) {
            console.log(error)
        }
    })
}