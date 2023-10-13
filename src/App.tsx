import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskBody from './components/TaskBody';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <div className="App h-screen flex flex-col max-w-screen-xl mx-auto">
        <Navbar />
        <div className="bg-gray-100 p-4 flex flex-col justify-center flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={<TaskBody />} />
            <Route path="*" element={<Login />} /> {/* This redirects to login */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
