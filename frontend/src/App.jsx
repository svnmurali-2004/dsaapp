

import Home from './pages/Home'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import AuthService from './AuthService'
import { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar'
import Main from './pages/Main'
import Profile from './pages/Profile'

import Loader from './components/Loader'

import {useLoader} from './context/LoaderContext'
import {useLogin} from './context/LoginContext'
import Sections from './pages/Sections'
import Questions from './pages/Questions'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
function App() {
      const {login,setLogin}=useLogin()
      const {loader}=useLoader()
      const navigate=useNavigate()
      useEffect(()=>{
        if (AuthService.isTokenExpired()){
          setLogin(false)
          navigate("/")
        }
      },[loader])
  return (  
    <GoogleOAuthProvider clientId="73387578779-c9ibjk7f0urhrsm8kqgks4633s7ovljb.apps.googleusercontent.com">
      <>
     <Navbar />
     <Loader/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        {login&&<>
        <Route path="/home" element={<Sections/>}/>
        
        <Route path="/profile" element={<Profile/>}/>
        </>
        }
       
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/signin" element={<SignIn />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/loader" element={<Loader/>}/>
        <Route path="/sections" element={<Sections/>}/>
        <Route path="/sections/:sectionid" element={<Questions/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
    </Routes>

     </>
    </GoogleOAuthProvider>
  )
}

export default App
