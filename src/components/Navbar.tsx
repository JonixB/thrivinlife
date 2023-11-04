import React, { useState } from 'react';
import { FaTasks, FaWallet } from 'react-icons/fa';
import { MdFitnessCenter, MdMenu } from 'react-icons/md';
import { supabase } from '../lib/helper/supabase';
import avatar from '../assets/images/avatar.jpg';
import { toast } from 'react-toastify';

interface Props {
  avatarUrl: string | null;
}

const Navbar: React.FC<Props> = ({ avatarUrl }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconMenuOpen, setIconMenuOpen] = useState(false);;

  const toggleMenu = (menuType: 'avatar' | 'icons') => {
    if (menuType === 'avatar') {
      setMenuOpen(!menuOpen);
      setIconMenuOpen(false);
    } else if (menuType === 'icons') {
      setIconMenuOpen(!iconMenuOpen);
      setMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    } else {
      toast.success('Successfully logged out!');
    }
  };

  return (
    <div className="bg-3498db p-4 text-white">
      <div className="flex justify-between items-center relative">

        {/* Logo */}
        <div className="flex items-center">
          <img src="/ThrivinLife-Tab-Logo.png" className="w-16 h-16" alt="ThrivinLife" />
          <h1 className="font-roboto text-2xl ml-1 self-center">ThrivinLife</h1>
        </div>

        {/* Avatar dropdown */}
        <div className="flex items-center relative">

          {/* Icons dropdown for small screens */}
          <div className="relative md:hidden mr-4">
            <button aria-label="Open Icon Menu" className="focus:outline-none" onClick={() => toggleMenu('icons')}>
              <MdMenu className="w-10 h-10" />
            </button>
            <div className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-black ${iconMenuOpen ? 'block' : 'hidden'}`}>
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

          <button aria-label="User Settings" className="focus:outline-none w-10 h-10" onClick={() => toggleMenu('avatar')}>
            <img src={avatarUrl ? avatarUrl : avatar} alt="User Avatar" className="w-full h-full rounded-full border-2 border-f5f5f5" />
          </button>
          <div className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-black ${menuOpen ? 'block' : 'hidden'}`}>
            <a href="/settings" className="block px-4 py-2">Settings</a>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 focus:outline-none">Logout</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Navbar;