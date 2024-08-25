const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require("http")
const { Server } = require('socket.io')
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

mongoose.connect(process.env.DB_STRING).then(() => {
     console.log("Mongo connected successfully")
}).catch((error) => {
     console.log("Error connecting to mongo: ", error.message)
})

const server = http.createServer(app)
const io = new Server(server, {
     cors: {
          origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://chat-me-eight.vercel.app"],
          methods: ["GET", "POST"]
     }
})

io.on("connection", (socket) => {
     let dataN = null
     console.log("Connected: ", socket.id)

     socket.on("sent Message", (data) => {
          dataN = data


          socket.broadcast.emit("recieving Message", { emmitted: dataN })
     })

})

module.exports = app

server.listen(process.env.PORT, () => console.log(`Server running on: http://localhost:${process.env.PORT}`))