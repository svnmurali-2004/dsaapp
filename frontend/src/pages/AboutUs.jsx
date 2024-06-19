// src/AboutUs.js

import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">About Us</h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome to the DSA App! Our mission is to provide a comprehensive platform for learning and mastering data structures and algorithms. We aim to simplify complex concepts and make them accessible to everyone.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Goals</h2>
      <ul className="list-disc list-inside mb-6 text-gray-700 pl-5 space-y-2">
        <li>Offer a wide range of tutorials and practice problems.</li>
        <li>Provide interactive coding challenges to enhance learning.</li>
        <li>Ensure a user-friendly experience with intuitive design.</li>
        <li>Keep the content updated with the latest industry trends.</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Meet Our Team</h2>
      
      <div className="mb-8 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-white p-4 rounded-lg shadow">
        <img 
          src="https://via.placeholder.com/150" 
          alt="SVN Murali" 
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold text-blue-600">SVN Murali</h3>
          <p className="text-gray-700">Role: Fullstack Developer</p>
          <p className="text-gray-700">
            SVN Murali is an experienced fullstack developer with a strong background in both frontend and backend technologies. He is passionate about building scalable and efficient applications.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-white p-4 rounded-lg shadow">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Sachin" 
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold text-blue-600">Sachin</h3>
          <p className="text-gray-700">Role: Front-end Developer</p>
          <p className="text-gray-700">
            Sachin is a skilled front-end developer who specializes in creating intuitive and responsive user interfaces. He ensures that our app is both visually appealing and user-friendly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
