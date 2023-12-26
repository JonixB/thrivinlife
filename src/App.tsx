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
import ConfirmationPage from './components/ConfirmationPage';
import ProfilePage from './components/ProfilePage';



function App() {
  const [user, setUser] = useState<Session | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');

  const fetchUserProfile = async (userId: string) => {
    if (userId) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*') // Fetch all columns
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      setAvatarUrl(data?.profile_image || null);
      setFirstName(data?.first_name || '');
    }
  };

  const checkProfileCompletion = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('first_name, last_name, profile_image, date_of_birth')
      .eq('user_id', userId)
      .single();

    if (data && data.first_name && data.last_name && data.profile_image && data.date_of_birth) {
      setIsProfileComplete(true);
    } else {
      setIsProfileComplete(false);
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
          fetchUserProfile(session.user.id);
          checkProfileCompletion(session.user.id);
        } else {
          setUser(null);
          setIsProfileComplete(false);
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
          <Routes>
            {user ? (
              <>
                {isProfileComplete ? (
                  <Route path="/*" element={<MainContent user={user} avatarUrl={avatarUrl} firstName={firstName} />} />
                ) : (
                  <Route path="/profile-setup" element={<ProfileSetup user={user.user} setIsProfileComplete={setIsProfileComplete} />} />
                )}
                <Route path="*" element={<Navigate to={isProfileComplete ? "/" : "/profile-setup"} />} />
                <Route path="/profile" element={user ? <ProfilePage user={user.user} /> : <Navigate to="/login" />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </div>
        <Footer />
        <ToastContainer position="top-right" />
      </div>
    </Router>
  );
}

export default App;
