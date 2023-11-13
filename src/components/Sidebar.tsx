import React from 'react';
import { FaTasks, FaWallet } from 'react-icons/fa';
import { MdFitnessCenter } from 'react-icons/md';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { supabase } from '../lib/helper/supabase';

interface Props {
  avatarUrl: string | null;
  userName: string | undefined;
}

const Sidebar: React.FC<Props> = ({ avatarUrl, userName }) => {
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
        <div className="shrink-0">
          <img
            className="rounded-full border-2 border-blue-500 p-1"
            src={avatarUrl || 'default-avatar-url'}
            alt="User Avatar"
            width="50"
            height="50"
          />
        </div>
        <div className="flex flex-col justify-center ml-4">
          <div className="text-lg font-bold text-gray-900">{userName}</div>
          <div className="text-sm text-gray-500">Welcome Back!</div>
        </div>
      </div>
      <ul className="space-y-4">
        <li className="flex items-center">
          <FaTasks className="text-blue-500 mr-3" />
          <span className="font-medium">Daily Tasks</span>
        </li>
        <li className="flex items-center">
          <FaWallet className="text-green-500 mr-3" />
          <span className="font-medium">Budgeting</span>
        </li>
        <li className="flex items-center">
          <MdFitnessCenter className="text-red-500 mr-3" />
          <span className="font-medium">Health</span>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        <FaArrowCircleLeft className="mr-3" />
        <span className="font-medium">Sign out</span>
      </button>
    </div>
  );
};

export default Sidebar;
