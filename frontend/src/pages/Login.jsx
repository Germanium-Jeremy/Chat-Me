import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import ChatMe from '../assets/chat.png'
import { UserContext } from '../contexts/AuthContext'

const Login = () => {
  const { emailL, passwordL, setEmailL, setPasswordL, login, loading } = useContext(UserContext)
  return (
    <div className={`w-full h-screen flex items-center justify-center px-3`}>
      <form className={`px-3 py-5 bg-slate-100 rounded-md shadow-lg shadow-gray-600 w-full flex flex-col`} onSubmit={login}>
        <img src={ChatMe} alt="Chat Me" loading='lazy' className={`w-16 h-16 rounded-full self-center`} />
        <h2 className={`text-xl font-bold text-center`}>Log In</h2>

        <div className={`flex flex-col gap-1`}>
          <label htmlFor="email" className={`font-semibold text-lg`}>Email</label>
          <input type="email" id="email" className={`w-full border border-black py-2 text-gray-950 rounded-md indent-3 outline-none`} placeholder='Email' value={emailL} onChange={(e) => setEmailL(e.target.value)} />
        </div>

        <div className={`flex flex-col gap-1 mt-2`}>
          <label htmlFor="password" className={`font-semibold text-lg`}>Password</label>
          <input type="password" id="password" className={`w-full border border-black py-2 text-gray-950 rounded-md indent-3 outline-none`} placeholder='Password' value={passwordL} onChange={(e) => setPasswordL(e.target.value)} />
        </div>

        <Link className={`font-semibold pt-1 text-end underline text-blue-700`} to={'/forgot'}>Forgot Password?</Link>
        {loading ? (
          <button type='disabled' disabled className={`rounded-xl bg-gray-700 py-2 font-bold w-full mt-4 text-white`}>Wait...</button>
        ) : (
          <button className={`rounded-xl linear-grad-btn hover:bg-blue-700 py-2 font-bold w-full mt-4 text-white`}>Login</button>
        )}
        
      </form>
    </div>
  )
}

export default Login
