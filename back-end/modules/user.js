const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'HEROESOFNEWERTH######THESTAFFOFMASTERBY@&@&@&THUNDERBRINGER'
const createUser = async (req, res) => {
    const { playername, username, password: bcryptpassword } = req.body.params
    const password = await bcrypt.hash(bcryptpassword, 10)
    try {
        const data = new User({
            playername: playername,
            username: username,
            password: password
        })
        User.createNewUser(data, (error) => {
            if (error) {
                console.log(error)
                if (error.code == 11000) {
                    return res.json({ status: 'error', error: 'Username has already exits' })
                }
                else console.log(error)
            }
            else res.json('Create User Successfully')
        })
    } catch (error) {
        console.log(error)
    }
}

const userLogin = async (req, res) => {
    const { username, password } = req.body.params
    const user = await User.findOne({ username: username }).lean()
    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username or password' })
    }
    // ดึงค่า hash จากฐานข้อมูล แล้วนำค่ามาตรวจสอบ กับข้อมูลที่ต้องการ
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id, username: user.username }
            , JWT_SECRET)
        return res.json({ status: 'ok', token: token })
    }
    res.json({ status: 'error', error: 'Username has already exits' })
}

const userGetMe = async (req, res) => {
    const { token } = req.query
    const user = await jwt.verify(token, JWT_SECRET)
    if (user) {
        const result = await User.findOne({ _id: user.id }).lean()
        return res.json(result)
    }
}

//Exports
module.exports = { createUser, userLogin, userGetMe }