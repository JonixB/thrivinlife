import React, { useState } from 'react';
import { supabase } from '../lib/helper/supabase';
import { toast } from 'react-toastify';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

interface ProfileSetupProps {
  user: User | null; // Allow for a null user
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ user }) => {
  const [profileInfo, setProfileInfo] = useState<User | null>(null);

  const navigate = useNavigate();

  const handleProfileSubmit = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .upsert({ user_id: user.id, ...profileInfo });

    if (error) {
      toast.error('Error saving profile');
      console.error(error);
    } else {
      toast.success('Profile updated successfully');
      navigate('/');
    }
  };

  // Form JSX here
  return (
    <div>
      {/* Form elements and submit button */}
      <button onClick={handleProfileSubmit}>Submit Profile</button>
    </div>
  );
};

export default ProfileSetup;
