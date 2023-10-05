import React, { useState } from 'react';
import { FaTasks, FaWallet } from 'react-icons/fa';
import { MdFitnessCenter, MdMenu } from 'react-icons/md'; 
import avatar from '../assets/images/avatar.jpg';

interface Props { }

const Navbar: React.FC<Props> = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconMenuOpen, setIconMenuOpen] = useState(false);

  const toggleMenu = (menuType: 'avatar' | 'icons') => {
    if (menuType === 'avatar') {
      setMenuOpen(!menuOpen);
      setIconMenuOpen(false);
    } else if (menuType === 'icons') {
      setIconMenuOpen(!iconMenuOpen);
      setMenuOpen(false);
    }
  };

  return (
    <div className="bg-3498db p-4 text-white">
      <div className="flex justify-between items-center relative">

        {/* Logo */}
        <div className="flex items-center">
          <span className="text-xl font-bold lg:text-sm font-roboto">ThrivinLife</span>
        </div>

        {/* Icons for larger screens */}
        <div className="hidden md:flex space-x-4">
          <button aria-label="Daily Tasks" className="focus:outline-none">
            <FaTasks />
          </button>
          <button aria-label="Expenses Tracking" className="focus:outline-none">
            <FaWallet />
          </button>
          <button aria-label="Fitness Tracking" className="focus:outline-none">
            <MdFitnessCenter />
          </button>
        </div>

        {/* Icons dropdown for small screens */}
        <div className="relative md:hidden">
          <button aria-label="Open Icon Menu" className="focus:outline-none" onClick={() => toggleMenu('icons')}>
            <MdMenu />
          </button>
          <div className={`absolute left-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-black ${iconMenuOpen ? 'block' : 'hidden'}`}>
            <button aria-label="Daily Tasks" className="block w-full text-left px-4 py-2 focus:outline-none">
              <FaTasks />
            </button>
            <button aria-label="Expenses Tracking" className="block w-full text-left px-4 py-2 focus:outline-none">
              <FaWallet />
            </button>
            <button aria-label="Fitness Tracking" className="block w-full text-left px-4 py-2 focus:outline-none">
              <MdFitnessCenter />
            </button>
          </div>
        </div>


        {/* Avatar dropdown */}
        <div className="flex items-center relative ml-4">
          <button aria-label="User Settings" className="focus:outline-none" onClick={() => toggleMenu('avatar')}>
            <img src={avatar} alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-f5f5f5" />
          </button>
          <div className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-black ${menuOpen ? 'block' : 'hidden'}`}>
            <a href="/settings" className="block px-4 py-2">Settings</a>
            <a href="/logout" className="block px-4 py-2">Logout</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Navbar;
