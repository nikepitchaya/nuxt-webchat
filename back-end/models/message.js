const mongoose = require('mongoose')

//Schema
let messageSchema = mongoose.Schema({
    room_id: { type: String },
    message: { type: String },
    name: { type: String },
    time: { type: String },
})

//Model 
let Message = mongoose.model("message", messageSchema)

//Exports Model
module.exports = Message

module.exports.createNewMessage = function (model, data) {
    console.log(model)
    model.save(data)
}
