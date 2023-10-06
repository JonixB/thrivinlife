import React, { useState } from 'react';
import TaskBody from './components/TaskBody';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
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
