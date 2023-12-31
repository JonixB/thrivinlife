import React, { useState } from 'react';
import { FaTasks, FaWallet } from 'react-icons/fa';
import { MdFitnessCenter } from 'react-icons/md';
import { FaBars } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { supabase } from '../lib/helper/supabase';
import { useNavigate } from 'react-router-dom';

interface Props {
  avatarUrl: string | null;
  firstName: string | null;
}

const Sidebar: React.FC<Props> = ({ avatarUrl, firstName }) => {
  const [activeItem, setActiveItem] = useState<string>('DailyTasks');
  const [showLogoutOptions, setShowLogoutOptions] = useState(false);
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const handleItemClick = (item: string) => {
    setActiveItem(item);
    if (item === 'Budgeting') {
      navigate('/budgeting');
    }
    if (item === 'DailyTasks') {
      navigate('/tasks');
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
    <div className="flex flex-col w-60 bg-white text-gray-800 pr-4 p-6 z-20">
      <div className="flex items-center mb-6">
        {avatarUrl ? (
          <img
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
            src={avatarUrl}
            alt="User Avatar"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold">
            {firstName && getInitials(firstName)}
          </div>
        )}
        <div className="flex flex-col justify-center ml-4">
          <div className="text-lg font-bold text-gray-900">{firstName}</div>
          <div className="text-sm text-gray-500">Welcome Back!</div>
        </div>
      </div>
      <ul className="space-y-4">
        <li
          className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300 
          ${activeItem === 'DailyTasks' ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-100 text-gray-800'}`}
          onClick={() => handleItemClick('DailyTasks')}
        >
          <FaTasks className="text-blue-500 mr-3" />
          <span className="font-medium">Daily Tasks</span>
        </li>
        <li
          className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300 
          ${activeItem === 'Budgeting' ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-100 text-gray-800'}`}
          onClick={() => handleItemClick('Budgeting')}
        >
          <FaWallet className="text-green-500 mr-3" />
          <span className="font-medium">Budgeting</span>
        </li>
        <li
          className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300 
          ${activeItem === 'Health' ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-100 text-gray-800'}`}
          onClick={() => handleItemClick('Health')}
        >
          <MdFitnessCenter className="text-red-500 mr-3" />
          <span className="font-medium">Health</span>
        </li>
      </ul>
      <div className="relative mt-auto">
        <div
          onMouseEnter={() => setShowLogoutOptions(true)}
          onMouseLeave={() => setShowLogoutOptions(false)}
          className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 cursor-pointer"
        >
          <div className="flex items-center">
            <FaBars className="mr-3" />
            <span className="font-medium">Options</span>
          </div>

          {showLogoutOptions && (
            <div className="bg-white shadow-md rounded-md absolute bottom-full left-1/2 py-2 w-48" style={{ transform: 'translateX(-50%)' }}>
              <ul className="text-sm">
                <li
                  className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  onClick={() => navigate('/profile')}
                >
                  Profile Settings
                </li>
                <li
                  className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
