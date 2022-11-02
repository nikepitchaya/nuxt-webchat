const Room = require('../models/room')
const Message = require('../models/message')

const createRoom = (req, res) => {
    console.log(req.body.params)
    const { author_id, author_name, room_id, room_name, create_at, room_password } = req.body.params
    try {
        const data = new Room({
            author_id: author_id,
            author_name: author_name,
            room_id: room_id,
            room_name: room_name,
            room_password: room_password,
            create_at: create_at
        })
        Room.createNewRoom(data, (error) => {
            if (error) {
                console.log(error)
                if (error.code == 11000) {
                    res.json('Room id has already exits')
                }
            }
            else res.json('Create Room Successfully')
        })
    } catch (error) {
        console.log(error)
    }
}

const updateRoom = (req, res) => {
    const { _id, room_id, room_name, author_id, room_password } = req.body.params
    const data = {
        author_id: author_id,
        room_id: room_id,
        room_name: room_name,
        room_password: room_password,
    }
    Room.findByIdAndUpdate({ _id: _id }, data, (err) => {
        if (err) {
            return err
        }
        else res.json('อัพเดตข้อมูลสำเร็จแล้วค่ะ')
    })
}

const deleteRoom = async (req, res) => {
    Room.findOne({ _id: req.params.id }).exec((error, document) => {
        if (error) console.log(error)
        if (document) {
            Message.deleteMany({ room_id: document.room_id }, (error) => {
                if (error) console.log(error)
                else {
                    Room.findOneAndDelete({ room_id: document.room_id }, (error) => {
                        if (error) console.log(error)
                        else res.json('Delete room successfully')
                    })
                }
            })
        }
        else res.json('Cannot delete room')
    })

}

const getAllRoom = (req, res) => {
    Room.find((error, document) => {
        if (error) console.log(error)
        else res.json(document)
    })
}

const getMyRoom = (req, res) => {
    const { room_id } = req.query
    let query = Room.where({ author_id: req.params.id })
    if (room_id) query = Room.where({ $and: [{ author_id: req.params.id }, { room_id: room_id }] })
    query.find((error, document) => {
        if (error) console.log(error)
        else res.json(document)
    })
    // Room.find({ $or: [{ author_id: req.params.id }, { room_id: req.query.room_id }] }, (error, document) => {
    //     if (error) console.log(error)
    //     else res.json(document)
    // })
}

const getOneRoom = (req, res) => {
    Room.findOne({ room_id: req.params.id }, (error, document) => {
        if (error) console.log(error)
        else res.json(document)
    })
}


module.exports = { createRoom, getMyRoom, getOneRoom, getAllRoom, updateRoom, deleteRoom }