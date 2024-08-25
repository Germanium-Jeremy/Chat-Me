import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import io from 'socket.io-client'

const socket = io.connect("http://localhost:5000")

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
          axios.get(`http://localhost:5000/createChat/${userId.id}/${id}`).then(response => {
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
          axios.post("http://localhost:5000/createMessage", { chatId: currentChat._id, senderId: userId.id, text: writtenMessage }).then(response => {
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
               axios.get("http://localhost:5000/allMessages/" + currentChat._id).then(response => {
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