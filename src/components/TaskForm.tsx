import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';

interface TaskFormProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (taskTitle: string, taskDescription: string, priority: string, status: string) => void;
  initialTask: Task | null;
}

interface Task {
  id: string;
  user_id: string;
  task_title: string;
  task_description: string;
  due_date: string;
  priority: string;
  status: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ show, onClose, onSubmit, initialTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('0');
  const [status, setStatus] = useState(initialTask ? initialTask.status : '');

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
        
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {initialTask ? 'Edit Task' : 'Add Task'}
                </h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task-title">
                    Task Title
                  </label>
                  <input
                    id="task-title"
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Enter task title"
                    required
                  />

                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task-description">
                    Task Description
                  </label>
                  <input
                    id="task-description"
                    type="text"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    placeholder="Describe the task"
                    required
                  />

                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task-priority">
                    Priority
                  </label>
                  <StarRating
                    rating={parseInt(priority, 10)}
                    onRatingChange={(newRating) => setPriority(newRating.toString())}
                  />

                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task-status">
                    Status
                  </label>
                  <select
                    id="task-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                  >
                    <option value="" disabled>Select status</option>
                    <option value="Complete">Complete</option>
                    <option value="Incomplete">Incomplete</option>
                  </select>

                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
