// src/ContactUs.js

import  { useState } from 'react';
import {useLoader} from '../context/LoaderContext'
import axios from 'axios';
const ContactUs = () => {
  const {loader,loaderdispatcher}=useLoader()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
    loaderdispatcher({type:"FETCH_STARTED",payload:"fetching started"})
    const respo=await axios.post(`${process.env.baseurl}/api/actions/contactus`,{email:formData.email,otp:formData.otp,name:formData.name,message:formData.message})
    loaderdispatcher({type:"FETCH_SUCCESS",payload:"fetching completed"})
    if(respo.data.ok){
      alert("Message sent successfully!")
    }
  }catch(err){
    loaderdispatcher({type:"FETCH_ERROR",payload:"fetching error"})
    console.log(err)
  }
    
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg mt-1">
      <h1 className="text-4xl font-bold text-center text-black-600 mb-8">Contact Us</h1>
      
      <p className="text-lg text-gray-700 mb-6 text-center">
        Have any questions or feedback? We'd love to hear from you! Reach out to us using the form below, or connect with us on social media.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Your email"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-800 mb-2" htmlFor="message">Message</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Your message"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send Message
        </button>
      </form>

      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Connect with Us</h2>
        <div className="flex justify-center space-x-4">
          <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800">Facebook</a>
          <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600">Twitter</a>
          <a href="https://instagram.com" className="text-pink-600 hover:text-pink-800">Instagram</a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
