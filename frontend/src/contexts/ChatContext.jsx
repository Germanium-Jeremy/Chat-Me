import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import io from 'socket.io-client'
import { config } from "../../config";

const socket = io.connect(config.backend)

export const ChatContext = createContext(null)

export const ChatProvider = ({ children }) => {
     const [currentChat, setCurrentChart] = useState([])
     const [friend, setFriend] = useState('Me')
     const [messages, setMessages] = useState([])
     const [newMessage, setNewMessage] = useState(false)
     const [recieve, setRecieve] = useState([])
     const [writtenMessage, setWrittenMessage] = useState('')
     const userId = JSON.parse(localStorage.getItem("Chat-Me User"))

     const createChat = async (id, username) => {
          axios.get(`${config.backend}/createChat/${userId.id}/${id}`).then(response => {
               setCurrentChart(response.data.chat)
               setFriend(username)
          }).catch(error => {
               if (error.response) {
                    console.log(error.response.data.message)
               } else {
                    toast.warn("Network Error")
               }
          })
     }

     const sendMessage = (e) => {
          e.preventDefault()
          newMessage && setNewMessage(false)
          axios.post(`${config.backend}/createMessage`, { chatId: currentChat._id, senderId: userId.id, text: writtenMessage }).then(response => {
               setNewMessage(true)
               setWrittenMessage('')
               socket.emit("sent Message", { chatId: currentChat._id, senderId: userId.id, text: writtenMessage })
          }).catch(error => {
               toast.warn("Message Not Delivered")
               console.log(error)
          })
     }

     useEffect(() => {
          newMessage && setNewMessage(false)
          socket.on("recieving Message", (data) => {
               setRecieve(data)
               setNewMessage(true)
          })
     }, [socket])

     useEffect(() => {
          if (currentChat) {
               axios.get(`${config.backend}/allMessages/` + currentChat._id).then(response => {
                    setMessages(response.data)
               }).catch(error => {
                    console.log(error)
               })
          }
     }, [currentChat, newMessage, recieve])

     return (
          <ChatContext.Provider value={{ currentChat, messages, friend, writtenMessage, recieve, createChat, sendMessage, setWrittenMessage, setCurrentChart }}>
               {children}
          </ChatContext.Provider>
     )
}