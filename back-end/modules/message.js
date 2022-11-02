const Message = require('../models/message')

const createMessage = (req, res) => {
    console.log(res)
    const { name, time, room, message } = req.body.params
    try {
        const data = new Message({
            name: name,
            time: time,
            room_id: room,
            message: message,
        })
        Message.createNewMessage(data, (error) => {
            if (error) {
                console.log(error)
            }
            else res.json('Create Message Successfully')
        })
    } catch (error) {
        console.log(error)
    }
}

const getAllMessage = (req, res) => {
    const { room_id } = req
    Message.find({ room_id: room_id }, (err, document) => {
        if (err) console.log(err)
        else res.json(document)
    })
}
module.exports = { createMessage, getAllMessage }