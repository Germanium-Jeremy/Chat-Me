const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const simpleRoutes = require('./routes/simpleRoutes')
const messageRoutes = require('./routes/messageRoutes')

app.use(userRoutes)
app.use(chatRoutes)
app.use(messageRoutes)
app.use(simpleRoutes)

mongoose.connect("mongodb://localhost:27017/chat-me").then(() => {
     console.log("Mongo connected successfully")
}).catch((error) => {
     console.log("Error connecting to mongo: ", error.message)
})

app.listen(process.env.PORT, () => console.log(`Server running on: http://localhost:${process.env.PORT}`))