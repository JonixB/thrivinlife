import React from 'react';

interface Props {
  avatarUrl: string | null;
  userName: string | undefined;
}

const Sidebar: React.FC<Props> = ({ avatarUrl, userName }) => {
  return (
    <div className="flex flex-col w-60 bg-gray-100 text-black pr-8">
      <div className="flex items-center mb-4">
        <div className="bg-white p-2 rounded-full mr-4">
          <img src={avatarUrl || 'default-avatar-url'} alt="User Avatar" width="40" height="40" />
        </div>
        <div className="text-xl font-semibold text-white">{userName}</div>
      </div>
      <ul className="space-y-4">
        <li>Daily Tasks</li>
        <li>Budgeting</li>
        <li>Health</li>
      </ul>
      <button className="mt-auto text-gray-400">Sign out</button>
    </div>
  );
};

export default Sidebar;
