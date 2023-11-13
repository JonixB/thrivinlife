import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import TaskCard from './TaskCard';
import avatar from '../assets/images/avatar.jpg';
import { supabase } from '../lib/helper/supabase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteConfirmation from './DeleteConfirmation';
import TaskForm from './TaskForm';
import { useTaskContext } from '../hooks/useTaskContext';

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
  const { selectedDate, tasks, setTasks, fetchTasksForDate, isTaskFormModalOpen, setTaskFormModalOpen, setCompletedTasks } = useTaskContext();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasksForDate(selectedDate);
  }, []);

  const handleOpenNewTaskForm = () => {
    setTaskToEdit(null);
    setTaskFormModalOpen(true);
  };

  const handleOpenEditTaskForm = (task: Task) => {
    setTaskToEdit(task);
    setTaskFormModalOpen(true);
  };

  const handleTaskFormSubmit = async (taskTitle: string, taskDescription: string, priority: string, status: string) => {
    const dueDateStr = selectedDate.toISOString().split('T')[0];
    const newTaskData = {
      user_id: userId,
      task_title: taskTitle,
      task_description: taskDescription,
      due_date: dueDateStr,
      priority: priority,
      status: status
    };

    if (taskToEdit) {
      const { error } = await supabase
        .from('tasks')
        .update(newTaskData)
        .eq('id', taskToEdit.id);

      if (error) {
        console.error('Error updating task:', error);
        toast.error('Failed to update task.');
        return;
      }

      toast.success('Task updated successfully.');
    } else {
      // Adding new task
      const { error } = await supabase
        .from('tasks')
        .insert(newTaskData);

      if (error) {
        console.error('Error adding task:', error);
        toast.error('Failed to add task.');
        return;
      }

      toast.success('Task added successfully.');
    }

    // Re-fetch tasks
    await fetchTasksForDate(selectedDate);
    setTaskFormModalOpen(false);
    setTaskToEdit(null);
  };

  const handleTaskToggle = async (taskId: string) => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      console.error('Task not found:', taskId);
      return;
    }

    const newStatus = tasks[taskIndex].status === 'Complete' ? 'Incomplete' : 'Complete';

    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);

    if (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status.');
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], status: newStatus };
    setTasks(updatedTasks);

    const completedCount = updatedTasks.filter(task => task.status === 'Complete').length;
    setCompletedTasks(completedCount);

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

  const handleFormClose = () => {
    setTaskFormModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4 flex-grow">
      <h2 className="text-2xl font-bold mb-4">{selectedDate.toDateString()}</h2>
      <DeleteConfirmation
        show={isDeleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
      <TaskForm
        show={isTaskFormModalOpen}
        onClose={handleFormClose}
        onSubmit={handleTaskFormSubmit}
        initialTask={taskToEdit}
      />
      <TaskCard
        tasks={tasks}
        onTaskToggle={handleTaskToggle}
        userAvatar={avatarUrl ? avatarUrl : avatar}
        onAddTask={handleOpenNewTaskForm}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleOpenEditTaskForm}
      />
    </div>
  );
}

export default TasksBody;
