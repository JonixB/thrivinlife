import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../lib/helper/supabase';

interface Task {
  id: string;
  user_id: string;
  task_title: string;
  task_description: string;
  due_date: string;
  priority: string;
  status: string;
}

export interface TaskContextProps {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  fetchTasksForDate: (date: Date) => Promise<void>;
  isTaskFormModalOpen: boolean;
  setTaskFormModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenNewTaskForm: () => void;
  userId: string;
  completedTasks: number;
  setCompletedTasks: React.Dispatch<React.SetStateAction<number>>;
  totalTasks: number;
  setTotalTasks: React.Dispatch<React.SetStateAction<number>>;
}
export const TaskContext = createContext<TaskContextProps | null>(null);

interface TaskProviderProps {
  children: React.ReactNode;
  userId: string;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children, userId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskFormModalOpen, setTaskFormModalOpen] = useState(false);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

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

  const handleOpenNewTaskForm = () => {
    setTaskFormModalOpen(true);
  };

  useEffect(() => {
    fetchTasksForDate(selectedDate);
  }, [selectedDate]);

  return (
    <TaskContext.Provider value={{
      selectedDate,
      setSelectedDate,
      tasks,
      setTasks,
      fetchTasksForDate,
      isTaskFormModalOpen,
      setTaskFormModalOpen,
      handleOpenNewTaskForm,
      userId,
      completedTasks,
      setCompletedTasks,
      totalTasks,
      setTotalTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};
