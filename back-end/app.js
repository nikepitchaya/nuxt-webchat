const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const server = http.createServer(app);
const router = require('./routers/routes')
const Message = require('./models/message')

dotenv.config()
app.use(express.json())
app.use(cors());
app.use(router);

mongoose.connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) console.log(err)
    else console.log("Mongdb is connected");
})
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
io.on('connection', (socket) => {
    console.log('Client connected ' + socket.id)
    socket.on('join_room', (room) => {
        socket.join(room)
        Message.find({ room_id: room }, (err, document) => {
            if (err) console.log(err)
            else io.to(room).emit('loading_message', document)
        })
    })
    socket.on('send_message', (res) => {
        console.log(res)
        const { name, time, room, message } = res
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
                else console.log('Create Message Successfully')
            })
        } 
        catch (error) {
            console.log(error)
        }
        io.to(res.room).emit('receive_message', res)
    })
    socket.on("disconnect", () => {
        console.log('Clinet disconnected');
    });
})

server.listen(8080, (() => {
    console.log('Start server at port 8080')
}))