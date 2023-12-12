import React, { useState } from 'react';
import { supabase } from '../lib/helper/supabase';
import { toast } from 'react-toastify';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

interface ProfileSetupProps {
  user: User | null;
}

interface ProfileInfo {
  first_name: string;
  last_name: string;
  profile_image: string;
  date_of_birth: string;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ user }) => {
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    first_name: '',
    last_name: '',
    profile_image: '',
    date_of_birth: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileInfo({
      ...profileInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async () => {
    if (!user) return;

    const { error } = await supabase
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

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleProfileSubmit();
      }}>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={profileInfo.first_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={profileInfo.last_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="profile_image"
          placeholder="Profile Image URL"
          value={profileInfo.profile_image}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date_of_birth"
          value={profileInfo.date_of_birth}
          onChange={handleInputChange}
        />
        <button type="submit">Submit Profile</button>
      </form>
    </div>
  );
};

export default ProfileSetup;
