import { useState } from 'react';
import axios from 'axios';
import AuthService from '../AuthService';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import {useLoader} from '../context/LoaderContext'

import {useLogin} from '../context/LoginContext'

const SignIn = () => {
  const {setLogin}=useLogin()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const {loader,loaderdispatcher}=useLoader()

  //google login function
  
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
    const respo=await axios.post(`${process.env.baseurl}/api/users/login`, formData)
    loaderdispatcher({type:"FETCH_SUCCESS",payload:"fetching completed"})
    console.log(respo.data)
    AuthService.setToken(respo.data.token)
    setLogin(true)
    navigate('/home')
    console.log(formData);
    }catch(err){
      loaderdispatcher({type:"FETCH_ERROR",payload:"fetching error"})
      alert(err.response.data.msg)
      console.log(err)
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
      loaderdispatcher({type:"FETCH_SUCCESS",payload:"fetching success"})
      if (respo.data.ok){
        AuthService.setToken(respo.data.token);
        setLogin(true)
        navigate('/home')
        console.log("auth success")
      }else{
        alert(respo.data.msg)
        console.log("error occured")
      }
    }catch(err){
      loaderdispatcher({type:"FETCH_ERROR",payload:"fetching error"})
      console.log(err)
    }}
  }});
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Sign In with an account</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          
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
          
          <div>
            <button
              type="submit"
              className="m-1 w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
            
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

export default SignIn;
