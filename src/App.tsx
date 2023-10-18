import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskBody from './components/TaskBody';
import Login from './components/Login';
import { supabase } from './lib/helper/supabase';
import { Session } from '@supabase/supabase-js';

function App() {
  const [user, setUser] = useState<Session | null>(null);

  useEffect(() => {
    
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data !== null) {
        setUser(data as unknown as Session); 
      }
    };
    fetchUser();
    console.log(user);
  }, []);

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
