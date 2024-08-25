import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaGoogle, FaSignInAlt } from 'react-icons/fa'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { UserContext } from '../contexts/AuthContext'

const LandingSecond = () => {
     const { googleAuth, loading } = useContext(UserContext)

     return (
          <div className={`px-3`}>
               <h2 className={`text-lg font-bold text-center mt-5`}>Sign In With</h2>
               <div className={`flex flex-col gap-3 mt-2 text-white`}>

                    {loading ? (
                         <button disabled="disabled" className={`rounded-xl bg-gray-500 py-2 font-bold flex gap-3 justify-center items-center`}>Wait...</button>
                    ) : (
                         <button onClick={() => googleAuth()} className={`rounded-xl linear-grad-btn hover:bg-blue-700 py-2 font-bold flex gap-3 justify-center items-center`}>
                              <FaGoogle />
                              Google
                         </button>
                    )}

                    <Link className={`rounded-xl linear-grad-btn hover:bg-blue-700 py-2 font-bold flex gap-3 justify-center items-center`} to={'/login'}>
                         <FaSignInAlt />   Sign in
                    </Link>
                    <Link className={`rounded-xl linear-grad-btn hover:bg-blue-700 py-2 font-bold flex gap-3 justify-center items-center`} to={'/signup'}>
                         <AiOutlineUserAdd />   Sign Up
                    </Link>

               </div>
          </div>
     )
}

export default LandingSecond
