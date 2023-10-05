import React from 'react';

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface TaskCardProps {
  date: string;
  tasks: Task[];
  onTaskToggle?: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ date, tasks, onTaskToggle }) => {
  return (
    <div className="max-w-xs mx-auto bg-gradient-to-r from-white to-bg-3498db shadow-md rounded-lg p-4 mb-4">
      <h2 className="font-bold text-xl text-black mb-3">{date}</h2>
      <ul>
        {tasks.map((task) => (
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
        ))}
      </ul>
    </div>
  );
};

export default TaskCard;