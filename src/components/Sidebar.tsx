import React from 'react';
import { FaTasks, FaWallet, FaSignOutAlt } from 'react-icons/fa';
import { MdFitnessCenter } from 'react-icons/md';

interface Props {
  avatarUrl: string | null;
  userName: string | undefined;
}

const Sidebar: React.FC<Props> = ({ avatarUrl, userName }) => {
  return (
    <div className="flex flex-col w-60 bg-gray-100 text-black pr-8 rounded-lg shadow-lg p-4">
      <div className="flex items-center mb-4">
        <div className="bg-white p-2 rounded-full mr-4">
          <img src={avatarUrl || 'default-avatar-url'} alt="User Avatar" width="40" height="40" />
        </div>
        <div className="text-xl font-semibold text-white">{userName}</div>
      </div>
      <ul className="space-y-4 text-gray-700">
        <li className="flex items-center">
          <FaTasks className="mr-2" /> Daily Tasks
        </li>
        <li className="flex items-center">
          <FaWallet className="mr-2" /> Budgeting
        </li>
        <li className="flex items-center">
          <MdFitnessCenter className="mr-2" /> Health
        </li>
      </ul>
      <button className="mt-auto text-gray-400 flex items-center">
        <FaSignOutAlt className="mr-2" /> Sign out
      </button>
    </div>
  );
};

export default Sidebar;