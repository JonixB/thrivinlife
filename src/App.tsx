import React, { useState } from 'react';
import TaskCard from './components/TaskCard';
import './App.css';
import Navbar from './components/Navbar';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      name: 'Morning walk',
      completed: false,
    },
    {
      id: '2',
      name: 'Buy groceries',
      completed: true,
    },
    // ... add more tasks
  ]);

  const toggleTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };
  return (
    <div className="App">
      <div className="mx-auto max-w-screen-xl">
        <Navbar />
        <div className="bg-gray-100 min-h-screen p-4">
          <TaskCard date="October 5, 2023" tasks={tasks} onTaskToggle={toggleTask} />
          {/* You can add more TaskCard components for other days */}
        </div>
      </div>
    </div>
  );
}

export default App;
