import React from 'react'
import ChatMe from '../assets/chat.png'

const Forget = () => {
     return (
          <div className={`w-full h-screen flex items-center justify-center px-3`}>
               <form className={`px-3 py-5 bg-slate-100 rounded-md shadow-lg shadow-gray-600 w-full flex flex-col`}>
                    <img src={ChatMe} alt="Chat Me" loading='lazy' className={`w-16 h-16 rounded-full self-center`} />
                    <h2 className={`text-xl font-bold text-center`}>Forgot Password</h2>
                    <div className={`flex flex-col gap-1`}>
                         <label htmlFor="email" className={`font-semibold text-lg`}>Email</label>
                         <input type="email" id="email" className={`w-full border border-black py-2 text-gray-950 rounded-md indent-3 outline-none`} placeholder='Email' />
                    </div>
                    <button className={`rounded-xl linear-grad-btn hover:bg-blue-700 py-2 font-bold w-full mt-4 text-white`}>Send Code</button>
               </form>

               <form className={`px-3 py-5 bg-slate-100 rounded-md shadow-lg shadow-gray-600 w-full flex flex-col`}>
                    <img src={ChatMe} alt="Chat Me" loading='lazy' className={`w-16 h-16 rounded-full self-center`} />
                    <h2 className={`text-xl font-bold text-center`}>Enter Code</h2>
                    <div className={`flex flex-col gap-1`}>
                         <label htmlFor="code" className={`font-semibold text-lg`}>Code</label>
                         <input type="text" id="code" className={`w-full border border-black py-2 text-gray-950 rounded-md indent-3 outline-none`} placeholder='Code' />
                    </div>
                    <button className={`rounded-xl linear-grad-btn hover:bg-blue-700 py-2 font-bold w-full mt-4 text-white`}>Verify</button>
               </form>
          </div>
     )
}

export default Forget
