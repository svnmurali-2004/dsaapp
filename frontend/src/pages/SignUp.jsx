import { useState } from 'react';
import AuthService from '../AuthService.jsx';
import axios from 'axios';
import baseurl from '../baseurl';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import {useLogin} from '../context/LoginContext'
import {useLoader} from '../context/LoaderContext'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const SignUp = () => {
  const {loader,loaderdispatcher}=useLoader()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [otpform,setOtpform]=useState(false)
  const navigate=useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    try{
    e.preventDefault();

    loaderdispatcher({type:"FETCH_STARTED",payload:"fetching started"})
    const respo3=await axios.post(`${process.env.baseurl}/api/users/otpverify`,{email:formData.email,otp:formData.otp,name:formData.name})
    loaderdispatcher({type:"FETCH_SUCCESS",payload:"fetching completed"})
    if(!respo3.data.ok){
      alert(respo3.data.mesg)
      return 
    }

    loaderdispatcher({type:"FETCH_STARTED",payload:"fetching started"})
    const respo=await axios.post(`${process.env.baseurl}/api/users/signup`, formData)
    loaderdispatcher({type:"FETCH_SUCCESS",payload:"fetching completed"})
    if(respo.data.ok){
      alert("signup success please login to continue")
      navigate('/signin')
    }else{
      alert(respo.data.msg)
    }
    console.log("executed signup success")
    }catch(err){
      console.log(err.response.data.msg)
      alert(err.response.data.msg)
      navigate('/signin')
    }
    
  };
  const googleLogin = useGoogleLogin({
    onSuccess: async(tokenResponse) =>{
      const userdata=async()=>{
        loaderdispatcher({type:"FETCH_STARTED",payload:"fetching started"})
      const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          'Authorization': `Bearer ${tokenResponse.access_token}`
        }
      
      })
      loaderdispatcher({type:"FETCH_SUCCESS",payload:"fetching completed"})
      return response.data
    }
    const data=await userdata()
    console.log(data)
    if(data){
      try{
      loaderdispatcher({type:"FETCH_STARTED",payload:"fetching started"})
      const respo=await axios.post(`${process.env.baseurl}/api/users/googleauth`,data)
      loaderdispatcher({type:"FETCH_SUCCESS",payload:"fetching completed"})
      if (respo.data.ok){
        AuthService.setToken(respo.data.token);
        navigate('/home')
        console.log("auth success")
      }else{
        alert(respo.data.msg)
        console.log("error occured")
      }
    }catch(err){
      loaderdispatcher({type:"FETCH_ERROR",payload:"fetching error"})
      console.log(err)
    }
  }
  }});

  const otpRequestHandler=async()=>{
    try{
        
        if(!formData.email||!formData.name){
          alert("please enter email and name to continue")
          return
        }
        loaderdispatcher({type:"FETCH_STARTED",payload:"fetching started"})
        const respo=await axios.post(`${process.env.baseurl}/api/users/getotp`,{email:formData.email,name:formData.name})
        loaderdispatcher({type:"FETCH_SUCCESS",payload:"fetching completed"})
        if(respo.data.ok){
            setOtpform(true)
            alert("otp sent to your email")}
            else{
              alert("error occured in sending otp please try again");
            }
    }catch(err){
      loaderdispatcher({type:"FETCH_ERROR",payload:"fetching error"})
      console.log(err)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Sign up for an account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          {!otpform&&<><div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
              placeholder="Email address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          
          </>}
          {otpform&&<div>
            <ArrowBackIcon onClick={()=>setOtpform(false)} className="cursor-pointer"/>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="otp"
              name="otp"
              type="text"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
              placeholder="enter the otp sent to your email"
              value={formData.otp}
              onChange={handleInputChange}
            />
          </div>}
          
          <div>
            {!otpform&&
            <div>
              
            <button
            type="button"
            onClick={otpRequestHandler}
            className="m-1 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
          </div>
            
            }
          {otpform&&
          <>
            
            <button
              type="submit"
              className="m-1 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
            </>
          }

            <button
              type="button"
              onClick={googleLogin}
              className="m-1 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Google login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
