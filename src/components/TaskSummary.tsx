import React, { useEffect } from 'react';
import { useTaskContext } from '../hooks/useTaskContext';
import CircularProgress from './CircularProgress';

const TaskSummary: React.FC = () => {
  const { userId, selectedDate, completedTasks, totalTasks, fetchTasksForDate } = useTaskContext();

  useEffect(() => {
    // Fetch tasks for the selected date whenever it changes
    if (userId && selectedDate) {
      (async () => {
        await fetchTasksForDate(selectedDate);
      })();
    }
  }, [selectedDate]);

  return (
    <div className="flex flex-col items-center p-4">
      <div className="mt-4">
        <CircularProgress value={completedTasks} max={totalTasks} />
      </div>
    </div>
  );
};

export default TaskSummary;
