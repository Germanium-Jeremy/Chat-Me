import React, { useContext } from 'react'
import { AiTwotoneMail  } from 'react-icons/ai'
import { ChatContext } from '../contexts/ChatContext'

const SendMessage = () => {
     const { sendMessage, setWrittenMessage, writtenMessage } = useContext(ChatContext)
     return (
          <div className={`fixed bottom-0 w-full bg-gray-50 py-2`}>
               <form className={`px-3 py-2 flex gap-3 items-center`} onSubmit={sendMessage}>
                    <textarea className={`w-full shadow-md shadow-gray-500 rounded-2xl py-3 px-3 outline-none`} placeholder='Message' value={writtenMessage} onChange={(e) => setWrittenMessage(e.target.value)}></textarea>
                    <button><AiTwotoneMail className={`text-4xl`} /></button>
               </form>
          </div>
     )
}

export default SendMessage
