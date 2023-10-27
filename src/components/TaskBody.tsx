import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskCard from './TaskCard';
import avatar from '../assets/images/avatar.jpg';
import { supabase } from '../lib/helper/supabase';

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface Props {
  avatarUrl: string | null;
  userId: string;
}

const TasksBody: React.FC<Props> = ({ avatarUrl, userId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasksForDate = async (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('date', dateStr)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }

    setTasks(data || []);
  };

  const handleAddTask = async (taskTitle: string, taskDescription: string, priority: string, status: string) => {
    const dueDateStr = selectedDate.toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        user_id: userId,
        task_title: taskTitle,
        task_description: taskDescription,
        due_date: dueDateStr,
        priority: priority,
        status: status
      }]);

    if (error) {
      console.error('Error adding task:', error);
      return;
    }

    if (data && Array.isArray(data)) {
      setTasks(prevTasks => [...prevTasks, ...data]);
    } else {
      console.error('Unexpected data format:', data);
    }
  };

  type ValuePiece = Date | null;
  type Value = ValuePiece | ValuePiece[];

  const handleDateChange = (value: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let date: Date | null = null;
    if (Array.isArray(value)) {
      date = value[0];
    } else {
      date = value;
    }
    if (date) {
      setSelectedDate(date);
      fetchTasksForDate(date);
    }
  };

  const handleTaskToggle = (taskId: string) => {
    // Logic to toggle task status
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <TaskCard
        date={selectedDate.toDateString()}
        tasks={tasks}
        onTaskToggle={handleTaskToggle}
        userAvatar={avatarUrl ? avatarUrl : avatar}
        onAddTask={handleAddTask}
      />
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
      />
    </div>
  );
}

export default TasksBody;
