const mongoose = require('mongoose')

//Schema
let userSchema = mongoose.Schema({
    playername: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

//Model 
let User = mongoose.model("user", userSchema)

//Exports Model
module.exports = User

module.exports.createNewUser = function (model, data) {
    console.log(model)
    model.save(data)
}
