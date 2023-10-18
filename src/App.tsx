import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskBody from './components/TaskBody';
import Login from './components/Login';
import { supabase } from './lib/helper/supabase';

function App() {
  const user = supabase.auth.user();
  return (
    <Router>
      <div className="App h-screen flex flex-col max-w-screen-xl mx-auto">
        {user && <Navbar />}
        <div className="bg-gray-100 p-4 flex flex-col justify-center flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={<TaskBody />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
        {user && <Footer />}
      </div>
    </Router>
  );
}

export default App;
