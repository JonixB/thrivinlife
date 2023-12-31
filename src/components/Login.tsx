import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/helper/supabase';
import { toast } from 'react-toastify';


const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSignUp = async (username: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: username,
      password: password,
    });

    if (error) {
      console.error(error.message);
    }
    if (data) {
      toast.info('Please check your email to verify your account!');
      navigate('/confirmation');
    }
  }

  const handleSignIn = async (username: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
  
    if (error) {
      console.error(error.message);
      setErrorMessage('Incorrect username or password.');
      return;
    }
    if (data) {
      // Directly navigate to home, App.tsx will handle redirection if the profile is incomplete
      toast.success('Login Successful');
      navigate('/');
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex w-full max-w-screen-xl mx-auto">
        <div className="w-1/2 flex flex-col justify-center items-center p-12 space-y-4">
          <h1 className="text-4xl font-bold text-center">ThrivinLife</h1>
          <p className="text-center">Your all-in-one self-improvement companion. Schedule your day, manage your finances, set and track your fitness goals, all in one place.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="username">Email</label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
          </div>
          {isSignUp && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border rounded-md"
              />
            </div>
          )}
          {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
          <div className="mb-4">
            <button
              onClick={() => isSignUp ? handleSignUp(username, password, confirmPassword) : handleSignIn(username, password)}
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm">
              {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}
              <span
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-blue-500 cursor-pointer ml-2"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
