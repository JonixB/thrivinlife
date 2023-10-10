import React, { useState } from 'react';
import TaskBody from './components/TaskBody';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App h-screen flex flex-col max-w-screen-xl mx-auto">
        <Navbar />
        <div className="bg-gray-100 p-4 flex flex-col justify-center flex-grow">
          <TaskBody /> 
        </div>
        <Footer />
    </div>
  );
}

export default App;
