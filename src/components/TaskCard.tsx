import React, { useState } from 'react';
import avatar from '../assets/images/avatar.jpg';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface Task {
  id: string,
  user_id: string,
  task_title: string,
  task_description: string,
  due_date: string,
  priority: string,
  status: string
}

interface TaskCardProps {
  date: string;
  tasks: Task[];
  userAvatar?: string;
  onTaskToggle?: (taskId: string) => void;
  onAddTask?: (taskTitle: string, taskDescription: string, priority: string, status: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ date, tasks, userAvatar, onTaskToggle, onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');

  return (
    <div className="flex flex-col bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto mb-4">
      {/* Date and Avatar Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl text-black">{date}</h2>
        <div className="w-10 h-10">
          {userAvatar ? (
            <img src={userAvatar} alt="User Avatar" className="w-full h-full rounded-full border-2 border-f5f5f5" />
          ) : (
            <img src={avatar} className="w-full h-full bg-gray-300 rounded-full" />
          )}
        </div>
      </div>

      {/* Tasks Section */}
      <ul className="mb-4">
        {tasks.length > 0 ? tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center mb-2 p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors">
            <span className={`text-gray-700 ${task.status === 'Complete' ? 'line-through' : ''}`}>
              {task.task_title}
            </span>
            <label className="cursor-pointer flex items-center">
              <input
                type="checkbox"
                className="hidden"
                checked={task.status === 'Complete'}
                onChange={() => onTaskToggle && onTaskToggle(task.id)}
              />
              {task.status === 'Complete' ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
            </label>
          </li>
        )) : (
          <div className="text-center py-4">
            <p className="mb-4">No tasks for this date.</p>
          </div>
        )}
      </ul>

      {/* Add Task Section */}
      <div className="border-t pt-4">
        <input type="text" placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="w-full p-2 mb-2 border rounded" />
        <input type="text" placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className="w-full p-2 mb-2 border rounded" />
        <input type="text" placeholder="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full p-2 mb-2 border rounded" />
        <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 mb-2 border rounded" />
        <button onClick={() => onAddTask && onAddTask(taskTitle, taskDescription, priority, status)} className="w-full bg-3498db text-white p-2 rounded shadow hover:bg-opacity-90 transition ease-in-out duration-150 focus:outline-none">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
