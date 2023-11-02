import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';

interface TaskFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (taskTitle: string, taskDescription: string, priority: string, status: string) => void;
  initialTask: Task | null;
}

interface Task {
  id: string,
  user_id: string,
  task_title: string,
  task_description: string,
  due_date: string,
  priority: string,
  status: string
}

const TaskForm: React.FC<TaskFormProps> = ({ show, onClose, onSubmit, initialTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('0');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!show) { 
      setTaskTitle('');
      setTaskDescription('');
      setPriority('0');
      setStatus('');
    } else if (initialTask) {
      setTaskTitle(initialTask.task_title);
      setTaskDescription(initialTask.task_description);
      setPriority(initialTask.priority);
      setStatus(initialTask.status);
    }
  }, [show, initialTask]);

  const handleSubmit = () => {
    onSubmit(taskTitle, taskDescription, priority, status);
    setTaskTitle('');
    setTaskDescription('');
    setPriority('0');
    setStatus('');
  };

  if (!show) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {initialTask ? 'Edit Task' : 'Add Task'}
                </h3>
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <input type="text" placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} className="w-full p-2 mb-2 border rounded" />
            <input type="text" placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} className="w-full p-2 mb-2 border rounded" />
            <StarRating
              rating={parseInt(priority, 10)}
              onRatingChange={(newRating) => setPriority(newRating.toString())}
            />
            <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 mb-2 border rounded" />
            <div className="border-t pt-4 flex justify-between">
              <button
                onClick={onClose}
                className="w-1/2 bg-gray-300 text-black p-2 rounded shadow hover:bg-opacity-90 transition ease-in-out duration-150 focus:outline-none mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="w-1/2 bg-3498db text-white p-2 rounded shadow hover:bg-opacity-90 transition ease-in-out duration-150 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
