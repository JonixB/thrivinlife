import React from 'react';
import { useLocation } from 'react-router-dom';
import Filter from './Filter';
import { TaskProvider } from '../context/TaskContext';
import TaskBody from './TaskBody';
import BudgetingComps from './BudgetingComps';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import Sidebar from './Sidebar';
import ProfilePage from './ProfilePage';

interface MainContentProps {
  user: Session | null;
  avatarUrl: string | null;
  firstName: string | null;
  updateAvatarUrl: () => Promise<void>;
}

const MainContent: React.FC<MainContentProps> = ({ user, avatarUrl, firstName, updateAvatarUrl }) => {
  const location = useLocation();

  if (!user) return null;

  return (
    <>
      <TaskProvider userId={user.user.id}>
        <Sidebar avatarUrl={avatarUrl} firstName={firstName} />
        <div className="flex-grow bg-gray-100 p-6 overflow-auto">
          <Routes>
            <Route path="/login" element={<Navigate to="/tasks" />} />
            <Route path="/tasks" element={<TaskBody avatarUrl={avatarUrl} userId={user.user.id} />} />
            <Route path="*" element={<Navigate to="/tasks" />} />
            <Route path="/budgeting" element={<BudgetingComps />} />
            <Route path="/profile" element={user ? <ProfilePage user={user.user} updateAvatarUrl={updateAvatarUrl} /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        {location.pathname === '/tasks' && <Filter />}
      </TaskProvider>
    </>
  );
};

export default MainContent;
