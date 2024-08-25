import './App.css'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Forget from './pages/Forget'
import Reset from './pages/Reset'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import Message from './pages/Message'
import Missing from './pages/Missing'

// import Header from './components/Header'
import Footer from './components/Footer'

import { UserProvider } from './contexts/AuthContext'
import { ChatProvider } from './contexts/ChatContext'

import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'

function App() {
  const user = JSON.parse(localStorage.getItem("Chat-Me User"))

  return (
    <UserProvider>
      <ChatProvider>
        <div>
          {/* <Header /> */}
          <BrowserRouter>
            <Routes location={location} key={location.pathname}>
              <Route path='/' element={<Landing />} />
              <Route path='/login' element={user ? <Chat /> : <Login />} />
              <Route path='/forgot' element={user ? <Chat /> : <Forget />} />
              <Route path='/reset' element={user ? <Chat /> : <Reset />} />
              <Route path='/signup' element={user ? <Chat /> : <Signup />} />
              <Route path='/chat' element={user ? <Chat /> : <Login />} />
              <Route path='/message' element={user ? <Message /> : <Login />} />
              <Route path='*' element={<Missing />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
        <ToastContainer hideProgressBar={true} pauseOnHover />
      </ChatProvider>
    </UserProvider>
  )
}

export default App
