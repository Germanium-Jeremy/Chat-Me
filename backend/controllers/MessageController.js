const MessageModel = require('../models/MessageModel')
require('dotenv').config()

const createMessage = async (req, res) => {
     try {
          const message = req.body
          console.log(message)

          const newMessage = new MessageModel({
               chatId: message.chatId,
               senderId: message.senderId,
               text: message.text
          });

          await newMessage.save();

          return res.status(201).send({ message: "Delivered", newMessage });
     } catch (error) {
          console.log(error.message)
          res.status(500).send({ message: "Internal Server Error" })
     }
}

const allMessages = async (req, res) => {
     const { chatId } = req.params
     try {
          const allMessage = await MessageModel.find({ chatId: chatId });
          if (allMessage == []) return res.status(400).send({ message: "No Messages" });

          return res.status(200).send(allMessage);
     } catch (error) {
          console.log(error.message);
          return res.status(500).send("Internal Server Error, Please Try Again");
     }
}

module.exports = { createMessage, allMessages }