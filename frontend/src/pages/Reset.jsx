import React from 'react'
import ChatMe from '../assets/chat.png'

const Reset = () => {
     return (
          <div className={`w-full h-screen flex items-center justify-center px-3`}>
               <form className={`px-3 py-5 bg-slate-100 rounded-md shadow-lg shadow-gray-600 w-full flex flex-col`}>
                    <img src={ChatMe} alt="Chat Me" loading='lazy' className={`w-16 h-16 rounded-full self-center`} />
                    <h2 className={`text-xl font-bold text-center`}>Forgot Password</h2>

                    <div className={`flex flex-col gap-1`}>
                         <label htmlFor="password" className={`font-semibold text-lg`}>New Password</label>
                         <input type="password" id="password" className={`w-full border border-black py-2 text-gray-950 rounded-md indent-3 outline-none`} placeholder='New Password' />
                    </div>

                    <div className={`flex flex-col gap-1 mt-4`}>
                         <label htmlFor="confirm" className={`font-semibold text-lg`}>Confirm Password</label>
                         <input type="password" id="confirm" className={`w-full border border-black py-2 text-gray-950 rounded-md indent-3 outline-none`} placeholder='Confirm Password' />
                    </div>

                    <button className={`rounded-xl linear-grad-btn hover:bg-blue-700 py-2 font-bold w-full mt-4 text-white`}>Reset</button>
               </form>

          </div>
     )
}

export default Reset
