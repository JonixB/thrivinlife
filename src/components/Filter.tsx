import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Ensure you import the base styles
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
      <div className="w-1/4 p-8">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          calendarType="US"
          className="border-none rounded-lg text-gray-700" 
          tileClassName="hover:bg-blue-100" 
        />
      </div>
    );
};

export default FilterSection;
