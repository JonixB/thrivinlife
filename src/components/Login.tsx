import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.REACT_APP_THRIVIN_LIFE_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.REACT_APP_THRIVIN_LIFE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface LoginProps {
  onLogin?: (username: string, password: string) => void;
  onSignUp?: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSignUp }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  
  const handleSignUp = async (username: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email: username,
      password: password,
    });
    
    if (error) {
      console.error(error.message);
    }
    if (data) {
      console.log(data);
    }
  }

  const handleSignIn = async (username: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    });
    
    if (error) {
      console.error(error.message);
    }
    if (data) {
      console.log(data);
    }
  }
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="username">Username</label>
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

        <div className="mb-4">
          <button
            onClick={() => isSignUp ? onSignUp?.(username, password) : onLogin?.(username, password)}
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
  );
}

export default Login;
