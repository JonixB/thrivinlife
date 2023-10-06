import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles.
import TaskCard from './TaskCard'; // Ensure this is the correct path

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

const TasksBody: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasksForDate = (date: Date) => {
    const fetchedTasks: Task[] = [
      // ... tasks for the selected date
    ];
    setTasks(fetchedTasks);
  };

  type ValuePiece = Date | null;
  type Value = ValuePiece | ValuePiece[];

  const handleDateChange = (value: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let date: Date | null = null;
    if (Array.isArray(value)) {
      date = value[0];
    } else {
      date = value;
    }
    if (date) {
      setSelectedDate(date);
      fetchTasksForDate(date);
    }
  };

  const handleTaskToggle = (taskId: string) => {
    // Logic to toggle task status
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
      />
      {tasks.length > 0 && (
        <TaskCard
          date={selectedDate.toDateString()}
          tasks={tasks}
          onTaskToggle={handleTaskToggle}
        />
      )}
      {tasks.length === 0 && <p>No tasks for this date.</p>}
    </div>
  );
};

export default TasksBody;
