import React from 'react';
import { useLocation } from 'react-router-dom';
import Filter from './Filter';
import { TaskProvider } from '../context/TaskContext';
import TaskBody from './TaskBody';
import BudgetingComps from './BudgetingComps';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import Sidebar from './Sidebar';

interface MainContentProps {
  user: Session | null;
  avatarUrl: string | null;
}

const MainContent: React.FC<MainContentProps> = ({ user, avatarUrl }) => {
  const location = useLocation();

  if (!user) return null;

  return (
    <>
      <TaskProvider userId={user.user.id}>
        <Sidebar avatarUrl={avatarUrl} userName={user.user.email} />
        <div className="flex-grow bg-gray-100 p-6 overflow-auto">
          <Routes>
            <Route path="/login" element={<Navigate to="/tasks" />} />
            <Route path="/tasks" element={<TaskBody avatarUrl={avatarUrl} userId={user.user.id} />} />
            <Route path="*" element={<Navigate to="/tasks" />} />
            <Route path="/budgeting" element={<BudgetingComps />} />
          </Routes>
        </div>
        {location.pathname !== '/budgeting' && <Filter />}
      </TaskProvider>
    </>
  );
};

export default MainContent;
