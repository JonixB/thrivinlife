import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskCard from './TaskCard';
import avatar from '../assets/images/avatar.jpg';
import { supabase } from '../lib/helper/supabase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteConfirmation from './DeleteConfirmation';

interface Task {
  id: string,
  user_id: string,
  task_title: string,
  task_description: string,
  due_date: string,
  priority: string,
  status: string
}

interface Props {
  avatarUrl: string | null;
  userId: string;
}

const TasksBody: React.FC<Props> = ({ avatarUrl, userId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchTasksForDate(selectedDate);
  }, []);

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


  const handleAddTask = async (taskTitle: string, taskDescription: string, priority: string, status: string) => {
    const dueDateStr = selectedDate.toISOString().split('T')[0];
    const newTask = {
      user_id: userId,
      task_title: taskTitle,
      task_description: taskDescription,
      due_date: dueDateStr,
      priority: priority,
      status: status
    };
    console.log('New Task:', newTask);

    const { error } = await supabase
      .from('tasks')
      .insert(newTask);

    if (error) {
      console.error('Error adding task:', error);
      toast.error('Failed to add task.');
      return;
    }

    // Re-fetch tasks
    await fetchTasksForDate(selectedDate);
    toast.success('Task added successfully.');
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

  const handleTaskToggle = async (taskId: string) => {
    const taskToToggle = tasks.find(task => task.id === taskId);

    if (!taskToToggle) {
      console.error('Task not found:', taskId);
      return;
    }

    const newStatus = taskToToggle.status === 'Complete' ? 'Incomplete' : 'Complete';

    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);

    if (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status.');
      return;
    }

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    toast.success('Task status updated successfully.');
  };

  const handleDeleteTask = async (taskId: string) => {
    setTaskToDelete(taskId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskToDelete);

    if (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task.');
      return;
    }

    // Re-fetch tasks
    await fetchTasksForDate(selectedDate);
    toast.success('Task deleted successfully.');
    setDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <DeleteConfirmation
        show={isDeleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
      <TaskCard
        date={selectedDate.toDateString()}
        tasks={tasks}
        onTaskToggle={handleTaskToggle}
        userAvatar={avatarUrl ? avatarUrl : avatar}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
      />
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
      />
    </div>
  );
}

export default TasksBody;
