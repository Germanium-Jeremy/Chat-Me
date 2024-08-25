import React, { useContext } from 'react'
import ChatMe from '../assets/chat.png'
import { UserContext } from '../contexts/AuthContext'

const Signup = () => {
  const { username, emailR, passwordR, setUsername, setEmailR, setPasswordR, register, loading } = useContext(UserContext)
  return (
    <div className={`w-full h-screen flex items-center justify-center px-3`}>
      <form className={`px-3 py-5 bg-slate-100 rounded-md shadow-lg shadow-gray-600 w-full flex flex-col`} onSubmit={register}>
        <img src={ChatMe} alt="Chat Me" loading='lazy' className={`w-16 h-16 rounded-full self-center`} />
        <h2 className={`text-xl font-bold text-center`}>Register</h2>

        <div className={`flex flex-col gap-1`}>
          <label htmlFor="username" className={`font-semibold text-lg`}>Username</label>
          <input type="text" id="username" className={`w-full border border-black py-2 text-gray-950 rounded-md indent-3 outline-none`} placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className={`flex flex-col gap-1 mt-2`}>
          <label htmlFor="email" className={`font-semibold text-lg`}>Email</label>
          <input type="email" id="email" className={`w-full border border-black py-2 text-gray-950 rounded-md indent-3 outline-none`} placeholder='Email' value={emailR} onChange={(e) => setEmailR(e.target.value)} />
        </div>
        <div className={`flex flex-col gap-1 mt-2`}>
          <label htmlFor="password" className={`font-semibold text-lg`}>Password</label>
          <input type="password" id="password" className={`w-full border border-black py-2 text-gray-950 rounded-md indent-3 outline-none`} placeholder='Password' value={passwordR} onChange={(e) => setPasswordR(e.target.value)} />
        </div>

        {loading ? (
          <button type='disabled' disabled className={`rounded-xl bg-gray-700 py-2 font-bold w-full mt-4 text-white`}>Wait...</button>
        ) : (
          <button className={`rounded-xl linear-grad-btn hover:bg-blue-700 py-2 font-bold w-full mt-4 text-white`}>Register</button>
        )}
      </form>
    </div>
  )
}

export default Signup
