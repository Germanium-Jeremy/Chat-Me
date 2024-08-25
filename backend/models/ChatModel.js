const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
     members: { type: Array, required: true }
},{
     timestamps: true
})

const ChatModel = new mongoose.model('Chat-me Chat', chatSchema)

module.exports = ChatModel