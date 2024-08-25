import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useGoogleLogin } from '@react-oauth/google'
import { config } from "../../config";

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
     const [username, setUsername] = useState('')
     const [emailR, setEmailR] = useState('')
     const [emailL, setEmailL] = useState('')
     const [passwordR, setPasswordR] = useState('')
     const [passwordL, setPasswordL] = useState('')
     const [emailF, setEmailF] = useState('')
     const [code, setCode] = useState('')
     const [passwordF, setPasswordF] = useState('')
     const [loading, setLoading] = useState(false)
     const [errorGot, setErrorGot] = useState(false)
     const [user, setUser] = useState([])
     const [allUsers, setAllUsers] = useState([])

     const register = (e) => {
          e.preventDefault()
          setLoading(true)
          setErrorGot(false)
          try {
               axios.post(`${config.backend}/register`, { username: username, email: emailR, password: passwordR }).then(response => {
                    setLoading(false)
                    localStorage.setItem("Chat-Me User", JSON.stringify(response.data))
                    setUser(response.data)
                    toast.success(response.data.message)
                    setTimeout(() => {
                         window.location = "/chat"
                    }, 2000);
               }).catch(error => {
                    setLoading(false)
                    setErrorGot(true)
                    toast.warn(error.response.data.message)
               })
          } catch (error) {
               setLoading(false)
               console.error(error.message)
               toast.error(error.message)
          }
     }

     const login = (e) => {
          e.preventDefault()
          setLoading(true)
          setErrorGot(false)
          try {
               axios.post(`${config.backend}/signin`, { email: emailL, password: passwordL }).then(response => {
                    setLoading(false)
                    localStorage.setItem("Chat-Me User", JSON.stringify(response.data))
                    setUser(response.data)
                    toast.success(response.data.message)
                    setTimeout(() => {
                         window.location = "/chat"
                    }, 2000);
               }).catch(error => {
                    setLoading(false)
                    setErrorGot(true)
                    toast.warn(error.response.data.message)
               })
          } catch (error) {
               setLoading(false)
               console.error(error.message)
               toast.error(error.message)
          }
     }

     useEffect(() => {
          const userId = JSON.parse(localStorage.getItem("Chat-Me User"))
          if (userId) {
               const getUsers = () => {
                    setLoading(true)
                    setErrorGot(false)
                    axios.get(`${config.backend}/allUsers/` + userId.id).then(response => {
                         setLoading(false)
                         setAllUsers(response.data)
                    }).catch(error => {
                         setLoading(false)
                         setErrorGot(true)
                         setTimeout(() => {
                              console.log(error.message)
                              getUsers()
                         }, 5000);
                    })
               }
               getUsers()
          }
     }, [])

     const googleAuth = useGoogleLogin({
          onSuccess: async (response) => {
               setLoading(true)
               try {
                    axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                         headers: { Authorization: `Bearer ${response.access_token}`}
                    }).then(data => {

                         const googleResponse = sendGoogleAuth(data.data)
                         if (!googleResponse) console.log("Auntentication Failed")
                         setLoading(false)
                    }).catch(error => {

                         setLoading(false)
                         console.log(error)
                    })
               } catch (error) {
                    setLoading(false)
                    console.log(error)
               }
          }
     })

     const sendGoogleAuth = async (data) => {
          try {
               axios.post(`${config.backend}/googleAuth`, { data: data}).then(response => {
                    localStorage.setItem("Chat-Me User", JSON.stringify(response.data))
                    toast.success(response.data.message)
                    setTimeout(() => {
                         return window.location = "/chat"
                    }, 2000);
               }).catch(error => {
                    console.error(error)
                    return false
               })
               return true
          } catch (error) {
               console.log(error.message)
               return false
          }
     }


     const getCode = () => {
          null
     }

     const matchCode = () => {
          null
     }

     const reset = () => {
          null
     }

     return (
          <UserContext.Provider value={{
               username, emailR, emailL, passwordR, passwordL, emailF, code, allUsers,
               passwordF, loading, errorGot, user, setUsername, setEmailR, setEmailL, setPasswordR, setPasswordL,
               setEmailF, setCode, setPasswordF, setLoading, setErrorGot, setUser, register, login, getCode,
               matchCode, reset, googleAuth
          }}>
               {children}
          </UserContext.Provider>
     )
}