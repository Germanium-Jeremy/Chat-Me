const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
     username: { type: String, required: true, default: "User" },
     email: { type: String, required: true },
     password: { type: String, required: true },
})

const UserModel = new mongoose.model('Chat-me User', userSchema)

module.exports = UserModel