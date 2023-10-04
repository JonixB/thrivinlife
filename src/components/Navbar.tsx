import React from 'react';

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <div className="bg-3498db p-4 text-white">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center">
          <span className="text-xl font-bold">Logo</span>
        </div>

        {/* Icons */}
        <div className="flex space-x-4">
          <button aria-label="Daily Tasks" className="focus:outline-none">
            <i className="fas fa-tasks">TEST</i>
          </button>
          <button aria-label="Expenses Tracking" className="focus:outline-none">
            <i className="fas fa-wallet"></i>
          </button>
          <button aria-label="Fitness Tracking" className="focus:outline-none">
            <i className="fas fa-running"></i>
          </button>
        </div>

        {/* Avatar */}
        <div className="flex items-center relative">
          <button aria-label="User Settings" className="focus:outline-none">
            <img src="path_to_avatar.jpg" alt="User Avatar" className="w-8 h-8 rounded-full border-2 border-f5f5f5"/>
          </button>
          {/* Dropdown Menu (Example) */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-black">
            <a href="/settings" className="block px-4 py-2">Settings</a>
            <a href="/logout" className="block px-4 py-2">Logout</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Navbar;
