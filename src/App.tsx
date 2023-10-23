import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
      if (data.session !== null) {
        setUser(data.session as Session);
      }
    };
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        if (session) {
          setUser(session);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div className="App h-screen flex flex-col max-w-screen-xl mx-auto">
        {user && <Navbar />}
        <div className="bg-gray-100 p-4 flex flex-col justify-center flex-grow">
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/tasks" /> : <Login />} />
            <Route path="/tasks" element={user ? <TaskBody /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={user ? "/tasks" : "/login"} />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
