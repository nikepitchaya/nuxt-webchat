const mongoose = require('mongoose')

//Schema
let roomSchema = mongoose.Schema({
    author_id: { type: String, required: true },
    author_name: { type: String },
    room_id: { type: String, required: true, unique: true },
    room_name: { type: String, required: true },
    room_password: { type: String },
    create_at: { type: Date }
})

//Model 
let Room = mongoose.model("room", roomSchema)

//Exports Model
module.exports = Room

module.exports.createNewRoom = function (model, data) {
    console.log(model)
    model.save(data)
}
