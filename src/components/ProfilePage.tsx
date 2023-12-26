import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/helper/supabase';
import { toast } from 'react-toastify';
import { User } from '@supabase/supabase-js';

interface ProfileInfo {
  firstName: string;
  lastName: string;
  profileImage: string;
  dateOfBirth: string;
}

interface Props {
  user: User;
}

const ProfilePage: React.FC<Props> = ({ user }) => {
  const [profile, setProfile] = useState<ProfileInfo>({
    firstName: '',
    lastName: '',
    profileImage: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      toast.error('Error fetching profile');
      console.error(error);
    } else if (data) {
      setProfile({
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        profileImage: data.profile_image || '',
        dateOfBirth: data.date_of_birth || '',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveProfile = async () => {
    const { error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        first_name: profile.firstName,
        last_name: profile.lastName,
        profile_image: profile.profileImage,
        date_of_birth: profile.dateOfBirth,
      });

    if (error) {
      toast.error('Error updating profile');
      console.error(error);
    } else {
      toast.success('Profile updated successfully');
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={profile.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={profile.lastName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="profileImage"
            placeholder="Profile Image URL"
            value={profile.profileImage}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="dateOfBirth"
            value={profile.dateOfBirth}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveProfile}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
