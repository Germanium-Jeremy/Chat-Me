const ChatModel = require('../models/ChatModel')
require('dotenv').config()

const createChat = async (req, res) => {
     try {
          const { firstId, secondId } = req.params
          console.log(firstId, secondId)

          if (firstId === secondId) return res.status(400).send({ message: "User IDs must be different" });

          let chat = await ChatModel.findOne({
               members: { $all: [firstId, secondId] }
          });

          if (chat) return res.status(200).send({ message: "Chat already exists", chat: chat })

          const newChat = new ChatModel({
               members: [firstId, secondId]
          });

          await newChat.save();

          return res.status(201).send({ message: "Chat created", chat: newChat });
     } catch (error) {
          console.log(error.message)
          res.status(500).send({ message: "Internal Server Error"})
     }
}

const allChats = async (req, res) => {
     try {
          const allChats = await ChatModel.find().sort({ createdAt: -1});
          if (!allChats) return res.status(400).send({ message: "No Chats" });

          return res.status(200).send(allChats);
     } catch (error) {
          console.log(error.message);
          return res.status(500).send("Internal Server Error, Please Try Again");
     }
}

module.exports = { createChat, allChats }