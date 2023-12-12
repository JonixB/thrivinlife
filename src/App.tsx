import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import { supabase } from './lib/helper/supabase';
import { Session } from '@supabase/supabase-js';
import { ToastContainer } from 'react-toastify';
import MainContent from './components/MainContent';
import ProfileSetup from './components/ProfileSetup';



function App() {
  const [user, setUser] = useState<Session | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const fetchAvatarUrl = async (userId: string) => {
    if (userId) {
      const { data, error } = await supabase
        .from('profiles')
        .select('profile_image')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching avatar URL:', error);
        return;
      }
      setAvatarUrl(data?.profile_image || null);
    }
  };

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
          fetchAvatarUrl(session.user.id);
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
      <div className="App flex flex-col h-screen max-w-screen-xl mx-auto">
        {user && <Navbar avatarUrl={avatarUrl} />}
        <div className="flex flex-1 overflow-hidden">
          {user ? (
            <MainContent user={user} avatarUrl={avatarUrl} />
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/profile-setup" element={<ProfileSetup user={user} />} />
            </Routes>
          )}
        </div>
        <Footer />
        <ToastContainer position="top-right" />
      </div>
    </Router>
  );
}

export default App;
