import React, { useContext, useState } from 'react'
import SendMessage from '../components/SendMessage'
import { ChatContext } from '../contexts/ChatContext'

const Message = () => {
     const { messages, friend } = useContext(ChatContext)
     const user = JSON.parse(localStorage.getItem("Chat-Me User"))
     return (
          <div className={`bg-gray-50 w-full min-h-screen`}>
               <div className={`shadow-md shadow-gray-600 px-3 py-4 text-center mx-5 rounded-lg mt-10`}>
                    Start Chart With {friend}
               </div>
               {messages.length >= 1 && (
                    <div className={`flex flex-col gap-5 w-full px-2 py-5 pb-[3.5rem]`}>
                         {messages.map((message, index) => {
                              let isUser = message.senderId == user.id ? true : false
                              return (
                                   <div className={`max-w-64 ${isUser ? "linear-grad self-end" : "shadow shadow-gray-600 self-start"}  rounded-3xl px-3 py-2 `} key={index}>
                                        <p className={`font-semibold text-lg text-wrap`}>{message.text}</p>
                                        <span className={`text-xs font-light float-end mt-1`}>12/12</span>
                                   </div>
                              )
                         })}
                    </div>
               )}
               <SendMessage />
          </div>
     )
}

export default Message
