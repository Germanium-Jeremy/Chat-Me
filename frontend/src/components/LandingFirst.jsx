import React from 'react'
import ChatMe from '../assets/chat.png'

const LandingFirst = () => {
     return (
          <div className={`linear-grad px-3 py-8 flex flex-col items-center`}>
               <h2 className={`text-3xl font-bold text-white text-center`}>Chat Me</h2>
               <img src={ChatMe} alt="Chat Me" loading='lazy' className={`w-1/3 mt-12`} />
          </div>
     )
}

export default LandingFirst
