import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';
import StarRating from './StarRating';

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
  tasks: Task[];
  userAvatar?: string;
  onTaskToggle?: (taskId: string) => void;
  onAddTask?: (taskTitle: string, taskDescription: string, priority: string, status: string) => void;
  onDeleteTask?: (taskId: string) => void;
  onEditTask?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ tasks, userAvatar, onTaskToggle, onAddTask, onDeleteTask, onEditTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('0');
  const [status, setStatus] = useState('');

  return (
    <div className="flex flex-col w-full h-[980px] overflow-y-auto bg-white shadow-lg rounded-lg p-6 my-4 task-card-container">
      {/* Tasks Section */}
      <ul className="mb-4">
        {tasks.length > 0 ? tasks.map((task) => (
          <li key={task.id} className="relative flex flex-col justify-between items-start mb-2 p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors" onClick={() => onEditTask && onEditTask(task)}>
            <span className="text-gray-700 font-bold">
              {task.task_title}
            </span>
            <span className="text-gray-700">
              {task.task_description}
            </span>
            <div className="flex justify-between items-center w-full mt-2">
              <div>
                <StarRating
                  rating={parseInt(task.priority, 10)}
                  onRatingChange={() => { }}
                />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTaskToggle && onTaskToggle(task.id)
                }}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                {task.status === 'Complete' ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteTask && onDeleteTask(task.id);
                }}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <FaTrash className="text-red-500" />
              </button>
            </div>
          </li>
        )) : (
          <div className="text-center py-4">
            <p className="mb-4">No tasks for this date.</p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default TaskCard;
