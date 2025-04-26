import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import logo from "../../../public/assets/image/flogo.jpg"

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => setNavOpen(!navOpen);
 const navLinks = [
    { name: 'Dashboard', path: '/Dashboard' },
    { name: 'Workouts', path: '/Workouts' },
    { name: 'Progress', path: '/Progress' },
    { name: 'Nutrition',path: '/Nutrition' },
    { name: 'Profile', path: '/Profile' },
    { name: 'Register', path: '/Register' },
    { name: 'Login', path: '/Login' }
  ];

  return (
    <nav className="bg-black shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            <img src={logo} alt='Logo' className="rounded-full w-16 h-16 hover:bg-slate-300" />
          </Link>

          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-white hover:text-indigo-600 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

        
          <div className="md:hidden">
            <button 
              onClick={toggleNav} 
              className="text-white focus:outline-none" 
            >
              {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      
      {navOpen && (
        <div className="md:hidden bg-gray-800 shadow-md">  
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block text-white px-3 py-2 rounded-md hover:bg-indigo-600 hover:bg-opacity-20"
                onClick={toggleNav} 
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;