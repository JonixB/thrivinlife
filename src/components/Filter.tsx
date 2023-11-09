import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useTaskContext } from '../hooks/useTaskContext';
import TaskSummary from './TaskSummary';

const FilterSection: React.FC = () => {
  const { selectedDate, setSelectedDate, fetchTasksForDate, handleOpenNewTaskForm } = useTaskContext();

  type ValuePiece = Date | null;
  type Value = ValuePiece | ValuePiece[];

  const handleDateChange: (value: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void =
    (value, event) => {
      const date = Array.isArray(value) ? value[0] : value;
      if (date) {
        setSelectedDate(date);
        fetchTasksForDate(date);
      }
    };

  return (
    <div className="w-[370px] p-8">
      <div className="mb-4 flex justify-between">
        <button
          onClick={handleOpenNewTaskForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Task
        </button>
      </div>

      {/* Calendar Component */}
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        calendarType="US"
        className="border-none rounded-lg text-gray-700"
        tileClassName="hover:bg-blue-100"
      />

      <TaskSummary />
    </div>
  );
};

export default FilterSection;
