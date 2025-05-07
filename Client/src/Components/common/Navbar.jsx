import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import logo from "../../../public/assets/image/flogo.jpg";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);

  const navLinks = [
    { name: 'Dashboard', path: '/Dashboard' },
    { name: 'Workouts', path: '/Workouts' },
    { name: 'Progress', path: '/Progress' },
    { name: 'Nutrition', path: '/Nutrition' },
    { name: 'Profile', path: '/Profile' },
    { name: 'Register', path: '/Register' },
    { name: 'Login', path: '/Login' }
  ];

  return (
    <nav className="bg-gray-900 shadow-lg fixed w-full z-10 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt='Logo' 
              className="rounded-full w-12 h-12 hover:bg-gray-700 transition duration-300 border-2 border-orange-400" 
            />
            <span className="ml-3 text-xl font-bold text-orange-400 hidden sm:block">FitnessApp</span>
          </Link>

       
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-orange-400 transition duration-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button 
              onClick={toggleNav} 
              className="text-gray-300 hover:text-orange-400 focus:outline-none transition duration-300" 
              aria-label="Toggle menu"
            >
              {navOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

   
      {navOpen && (
        <div className="md:hidden bg-gray-800 shadow-xl">  
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block text-gray-300 hover:bg-gray-700 hover:text-orange-400 px-3 py-2 rounded-md text-base font-medium transition duration-300"
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