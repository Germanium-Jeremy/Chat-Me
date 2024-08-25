import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from 'socket.io-client'

export const ChatContext = createContext(null)

export const ChatProvider = ({ children }) => {
     const [currentChat, setCurrentChart] = useState([])
     const [friend, setFriend] = useState('Me')
     const [messages, setMessages] = useState([])
     const [newMessage, setNewMessage] = useState(false)
     const [writtenMessage, setWrittenMessage] = useState('')
     // const [socket, setSocket] = useState(null)
     const userId = JSON.parse(localStorage.getItem("Chat-Me User"))

     const createChat = async (id, username) => {
          axios.get(`http://localhost:5000/createChat/${userId.id}/${id}`).then(response => {
               setCurrentChart(response.data.chat)
               setFriend(username)
               // console.log(response.data.chat)
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
          setNewMessage(false)
          axios.post("http://localhost:5000/createMessage", { chatId: currentChat._id, senderId: userId.id, text: writtenMessage }).then(response => {
               console.log(response.data)
               setNewMessage(true)
               setWrittenMessage('')
          }).catch(error => {
               toast.warn("Message Not Delivered")
               console.log(error)
          })
     }

     // useEffect(() => {
     //      const newSocket = io("http://localhost:5175/")
     //      setSocket(newSocket)

     //      return () => newMessage.disconnect()
     // }, [userId])

     // useEffect(() => {
     //      if (socket == null) return
     //      socket.emit("addNewUser", userId.id)
     // }, [socket])

     useEffect(() => {
          if (currentChat) {
               axios.get("http://localhost:5000/allMessages/" + currentChat._id).then(response => {
                    setMessages(response.data)
                    // console.log(response.data)
               }).catch(error => {
                    console.log(error)
               })
          }
     }, [currentChat, newMessage])

     return (
          <ChatContext.Provider value={{ currentChat, messages, friend, writtenMessage, createChat, sendMessage, setWrittenMessage }}>
               {children}
          </ChatContext.Provider>
     )
}