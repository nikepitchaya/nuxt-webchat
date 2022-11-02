const express = require('express')
const router = express.Router()
const User = require('../modules/user.js')
const Room = require('../modules/room')
const Message = require('../modules/message.js')

//User
router.post("/create/user", (req, res) => User.createUser(req, res))
router.post('/login/user', (req, res) => User.userLogin(req, res))
router.get('/me', (req, res) => User.userGetMe(req, res))
//Room
router.post('/create/room', (req, res) => Room.createRoom(req, res))
router.post('/update/room', (req, res) => Room.updateRoom(req, res))
router.delete('/delete/room/:id', (req, res) => Room.deleteRoom(req, res))
router.get('/me/room/:id', (req, res) => Room.getMyRoom(req, res))
router.get('/one/room/:id', (req, res) => Room.getOneRoom(req, res))
router.get('/all/room', (req, res) => Room.getAllRoom(req, res))
//Message
router.get('/get/all/message', (req, res) => Message.getAllMessage(req, res))

module.exports = router