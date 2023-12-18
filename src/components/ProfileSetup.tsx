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

const ProfileSetup: React.FC<ProfileSetupProps & { setIsProfileComplete: (isComplete: boolean) => void }> = ({ user, setIsProfileComplete }) => {
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
      setIsProfileComplete(true);
      navigate('/');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Setup</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleProfileSubmit();
        }} className="space-y-4">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={profileInfo.first_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={profileInfo.last_name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="profile_image"
            placeholder="Profile Image URL"
            value={profileInfo.profile_image}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="date_of_birth"
            value={profileInfo.date_of_birth}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end mt-6">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
