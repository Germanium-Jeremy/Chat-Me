import React, { useContext } from 'react'
import { FaSearch } from 'react-icons/fa'
import ChatMe from '../assets/chat.png'
import { UserContext } from '../contexts/AuthContext'
import { ChatContext } from '../contexts/ChatContext'
import { useNavigate } from 'react-router-dom'

const Chat = () => {
  const { allUsers, errorGot, loading } = useContext(UserContext)
  const { createChat } = useContext(ChatContext)
  const navigate = useNavigate()

  return (
    <div className={`py-5 pb-20 bg-gray-50 min-h-screen`}>
      <div className={`px-3 bg-gray-50 w-full sticky top-0`}>
        <h2 className={`font-bold text-xl`}>Contacts</h2>
        <div className={`w-full shadow-md shadow-gray-300 rounded-xl bg-gray-100 overflow-hidden relative`}>
          <FaSearch className={`absolute top-3 left-2 text-xl`} />
          <input type="text" className={`w-full py-3 pl-10 pr-2 outline-none border-none`} placeholder='Search Friend' />
        </div>
      </div>
      {loading ? (
        <div className={`mt-10 px-3`}>
          <div className={`flex gap-2 bg-gray-300 px-3 py-2 rounded-lg hover:shadow-lg shadow-gray-500 mb-8 animate-pulse`}>
            <span className={`w-14 h-14 rounded-full border bg-gray-600 animate-pulse border-black p-1`}></span>
          </div>
          <div className={`flex gap-2 bg-gray-300 px-3 py-2 rounded-lg hover:shadow-lg shadow-gray-500 mb-8 animate-pulse`}>
            <span className={`w-14 h-14 rounded-full border bg-gray-600 animate-pulse border-black p-1`}></span>
          </div>
          <div className={`flex gap-2 bg-gray-300 px-3 py-2 rounded-lg hover:shadow-lg shadow-gray-500 mb-8 animate-pulse`}>
            <span className={`w-14 h-14 rounded-full border bg-gray-600 animate-pulse border-black p-1`}></span>
          </div>
          <div className={`flex gap-2 bg-gray-300 px-3 py-2 rounded-lg hover:shadow-lg shadow-gray-500 mb-8 animate-pulse`}>
            <span className={`w-14 h-14 rounded-full border bg-gray-600 animate-pulse border-black p-1`}></span>
          </div>
          <div className={`flex gap-2 bg-gray-300 px-3 py-2 rounded-lg hover:shadow-lg shadow-gray-500 mb-8 animate-pulse`}>
            <span className={`w-14 h-14 rounded-full border bg-gray-600 animate-pulse border-black p-1`}></span>
          </div>
        </div>
      ) : (
        <div className={`mt-10 px-3`}>
          {allUsers.map((user, index) => {
            return (
              <button className={`flex gap-2 bg-gray-100 px-3 py-2 rounded-lg hover:shadow-lg shadow-gray-500 mb-3 w-full`} key={index} onClick={
                async () => {
                  await createChat(user._id, user.username)
                  navigate('/message')
                }
              }>
                <img src={ChatMe} alt="User" loading='lazy' className={`w-14 h-14 rounded-full border border-black p-1`} />
                <div>
                  <h2 className={`text-lg font-semibold text-left`}>{user.username}</h2>
                  <p className={`flex gap-4 text-sm`}>
                    {/* <span className={`font-semibold`}>12:12</span> */}
                    <span className={`font-light`}>{user.email}</span>
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Chat
