import React, { useState } from 'react';
import TaskBody from './components/TaskBody';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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

  return (
    <div className="App">
      <div className="mx-auto max-w-screen-xl">
        <Navbar />
        <div className="bg-gray-100 flex-grow p-4 flex flex-col justify-center">
          <TaskBody /> 
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
