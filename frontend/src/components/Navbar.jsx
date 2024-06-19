// src/Navbar.js
import  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {useLogin} from '../context/LoginContext'
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {login }=useLogin()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          MyApp
        </div>
        <div className="hidden md:flex space-x-4">
            {!login&&<>
                <NavLink to="/signin" exact className="text-white hover:text-gray-300" activeClassName="font-bold">Sign In</NavLink>
                <NavLink to="/signup" className="text-white hover:text-gray-300" activeClassName="font-bold">Sign Up</NavLink>
                </>}
            {login &&
          <NavLink to="/home" exact className="text-white hover:text-gray-300" activeClassName="font-bold">Home</NavLink>
            }
          <NavLink to="/aboutus" className="text-white hover:text-gray-300" activeClassName="font-bold">About Us</NavLink>
          <NavLink to="/contactus" className="text-white hover:text-gray-300" activeClassName="font-bold">Contact Us</NavLink>
          {login&&
          <NavLink to="/profile" className="text-white hover:text-gray-300" activeClassName="font-bold">Profile</NavLink>
            }
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-2">
            {!login&&<>
            <NavLink to="/signin" className="text-white hover:text-gray-300" activeClassName="font-bold" onClick={toggleMenu}>SignIn</NavLink>
            <NavLink to="/signup" className="text-white hover:text-gray-300" activeClassName="font-bold" onClick={toggleMenu}>Sign Up</NavLink>
            </>
            }
            {login&&
            <NavLink to="/home" exact className="text-white hover:text-gray-300" activeClassName="font-bold" onClick={toggleMenu}>Home</NavLink>
            }
          
          <NavLink to="/aboutus" className="text-white hover:text-gray-300" activeClassName="font-bold" onClick={toggleMenu}>About Us</NavLink>
          <NavLink to="/contactus" className="text-white hover:text-gray-300" activeClassName="font-bold" onClick={toggleMenu}>Contact Us</NavLink>
          {login&&
          <NavLink to="/profile" className="text-white hover:text-gray-300" activeClassName="font-bold" onClick={toggleMenu}>Profile</NavLink>
            }
        </div>
      )}
    </nav>
  );
}

export default Navbar;
