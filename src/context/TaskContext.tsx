import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/helper/supabase';

export const TaskContext = createContext(null);

interface TaskProviderProps {
  userId: string;
}


export const TaskProvider: React.FC<React.PropsWithChildren<TaskProviderProps>> = ({ userId, children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  const fetchTasksForDate = async (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('due_date', dateStr)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }
    console.log(data);
    setTasks(data || []);
  };

  useEffect(() => {
    fetchTasksForDate(selectedDate);
  }, [selectedDate]);

  return (
    <TaskContext.Provider value={{ selectedDate, setSelectedDate, tasks, setTasks, fetchTasksForDate }}>
      {children}
    </TaskContext.Provider>
  );
};
