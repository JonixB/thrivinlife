import React from 'react';
import { useLocation } from 'react-router-dom';
import Filter from './Filter';
import { TaskProvider } from '../context/TaskContext';
import TaskBody from './TaskBody';
import BudgetingComps from './BudgetingComps';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';

interface MainContentProps {
  user: Session | null;
  avatarUrl: string | null;
}

const MainContent: React.FC<MainContentProps> = ({ user, avatarUrl }) => {
  const location = useLocation();

  if (!user) return null;

  return (
    <div className="flex-grow bg-gray-100 p-6 overflow-auto">
      <TaskProvider userId={user.user.id}>
        <Routes>
          <Route path="/login" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<TaskBody avatarUrl={avatarUrl} userId={user.user.id} />} />
          <Route path="*" element={<Navigate to="/tasks" />} />
          <Route path="/budgeting" element={<BudgetingComps />} />
        </Routes>
        {location.pathname !== '/budgeting' && <Filter />}
      </TaskProvider>
    </div>
  );
};

export default MainContent;
