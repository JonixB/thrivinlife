import React, { useState, useEffect } from 'react';
import { calculateCompletionRate, fetchTasks } from '../lib/helper/taskHelper';
import { useTaskContext } from '../hooks/useTaskContext';

type TimeFilter = 'This Week' | 'This Month' | 'This Year' | 'Custom';

const TaskSummary: React.FC = () => {
  const { userId } = useTaskContext();
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('This Week');
  const [completedTasks, setCompletedTasks] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  // Fetch tasks based on the selected time filter
  const updateTasks = async (filter: TimeFilter) => {
    // Ensure that the userId is available
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    const { completed, total } = await fetchTasks(filter, userId); 
    setCompletedTasks(completed);
    setTotalTasks(total);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = event.target.value as TimeFilter; 
    setTimeFilter(newFilter);
    updateTasks(newFilter);
  };

  useEffect(() => {
    updateTasks(timeFilter);
  }, [timeFilter]);

  const completionRate = calculateCompletionRate(completedTasks, totalTasks);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mb-4">
        <select
          id="time-filter"
          value={timeFilter}
          onChange={handleFilterChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
          <option>Custom</option>
        </select>
      </div>

      <div>
        {/* circular progress bar here */}
        <div className="text-center">
          <span className="text-lg font-semibold">{completedTasks} / {totalTasks}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;
