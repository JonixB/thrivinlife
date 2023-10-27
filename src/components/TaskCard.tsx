import React, { useState } from 'react';
import avatar from '../assets/images/avatar.jpg';

interface Task {
  id: string;
  name: string;
  completed: boolean;
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
    <div className="flex justify-between items-center max-w-xs mx-auto mb-4">
      {/* User Avatar Section */}
      <div className="flex-shrink-0 w-20 h-20">
        {userAvatar ? (
          <img src={userAvatar} alt="User Avatar" className="w-full h-full rounded-full border-2 border-f5f5f5" />
        ) : (
          <img src={avatar} className="w-full h-full bg-gray-300 rounded-full" />
        )}
      </div>

      {/* Tasks Section */}
      <div className="flex-grow bg-gradient-to-r from-white to-bg-3498db shadow-md rounded-lg p-4">
        <h2 className="font-bold text-xl text-black mb-3">{date}</h2>
        <ul>
          {tasks.length > 0 ? tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center mb-2 bg-white rounded p-2 hover:shadow-md transition-shadow">
              <span className={`text-gray-700 ${task.completed ? 'line-through' : ''}`}>
                {task.name}
              </span>
              <label className="cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={task.completed}
                  onChange={() => onTaskToggle && onTaskToggle(task.id)}
                />
                <div className={`w-5 h-5 bg-border-f5f5f5 border-2 border-gray-300 rounded ${task.completed ? 'bg-3498db' : ''}`}></div>
              </label>
            </li>
          )) : (
            <div className="text-center py-4">
              <p className="mb-4">No tasks for this date.</p>
            </div>
          )}
        </ul>
        <div className="mt-4 text-center">
          <input type="text" placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
          <input type="text" placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
          <input type="text" placeholder="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
          <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
          <button onClick={() => onAddTask && onAddTask(taskTitle, taskDescription, priority, status)} className="bg-3498db text-white px-4 py-2 rounded shadow hover:bg-opacity-90 transition ease-in-out duration-150 focus:outline-none">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
