// const { Server, Socket } = require('socket.io')

// const io = new Server({ cors: ["http://localhost:5173", "http://127.0.0.1:5173"] })

// let onlineUsers = []

// io.on("connection", (socket) => {
//      console.log("Connected: " + socket.id)

//      Socket.on("addNewUser", (userId) => {
//           !onlineUsers.some((user) => user.userId === userId) && onlineUsers.push({
//                userId,
//                socketId: socket.id
//           })
//           console.log("Online Users: ", onlineUsers)
//      })
// })

// io.listen(5175, () => console.log("Socket Connected On port 5175"))