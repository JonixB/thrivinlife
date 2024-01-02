import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { supabase } from '../lib/helper/supabase';
import { toast } from 'react-toastify';
import { User } from '@supabase/supabase-js';
import ProfileImageUpload from './ProfileImageUpload';

interface ProfileInfo {
  firstName: string;
  lastName: string;
  profileImage: string;
  dateOfBirth: string;
}

interface Props {
  user: User;
  updateAvatarUrl: () => Promise<void>;
}

const ProfilePage: React.FC<Props> = ({ user, updateAvatarUrl }) => {
  const [profile, setProfile] = useState<ProfileInfo>({
    firstName: '',
    lastName: '',
    profileImage: '',
    dateOfBirth: '',
  });

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      return filePath;
    } catch (error) {
      toast.error('Failed to upload image');
      return null;
    }
  };

  const handleImageUpload = async (file: File) => {
    const filePath = await uploadImage(file);
    if (filePath) {
      await fetchProfileImage(filePath);
    }
  };

  const fetchProfileImage = async (path: string) => {
    const response = await supabase.storage.from('avatars').getPublicUrl(path);
    const publicUrl = response.data?.publicUrl;

    if (publicUrl) {
      const imagePath = path;
      setProfile({ ...profile, profileImage: imagePath });

      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          profile_image: imagePath,
        });

      if (error) {
        toast.error('Error saving profile image to the database');
        console.error(error);
      } else {
        toast.success('Profile image updated successfully');
        await updateAvatarUrl();
      }

    } else {
      toast.error('Error fetching profile image URL');
    }
  };

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

  const handleSaveProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        first_name: profile.firstName,
        last_name: profile.lastName,
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
    <div className="flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Edit Your Profile</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Update your personal information here.
          </p>
        </div>
        <ProfileImageUpload currentImage={profile.profileImage ? `${process.env.REACT_APP_THRIVIN_LIFE_SUPABASE_URL!}/storage/v1/object/public/avatars/${profile.profileImage}` : null} onImageUpload={handleImageUpload} firstName={profile.firstName}/>
        <form className="mt-8 space-y-6" onSubmit={handleSaveProfile}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="firstName" className="sr-only">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
                value={profile.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
                value={profile.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="sr-only">Date of Birth</label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={profile.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
