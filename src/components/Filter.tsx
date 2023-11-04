import React, { useContext } from 'react';
import Calendar from 'react-calendar';
import { TaskContext } from '../context/TaskContext';
import { useTaskContext } from '../hooks/useTaskContext';

const FilterSection: React.FC = () => {
  const { selectedDate, setSelectedDate, fetchTasksForDate } = useTaskContext();

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
    <div className="w-1/3 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Filter by</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
      />
    </div>
  );
};

export default FilterSection;
