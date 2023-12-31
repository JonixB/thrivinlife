import React, { useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';

interface Props {
  currentImage: string | null;
  onImageUpload: (file: File) => void;
  firstName: string | null;
}

const ProfileImageUpload: React.FC<Props> = ({ currentImage, onImageUpload, firstName }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const getInitials = (name: string | null) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      onImageUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {currentImage ? (
          <img
            src={currentImage}
            alt="Profile"
            className="h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-full object-cover"
          />
        ) : (
          <div className="h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-full bg-blue-500 flex items-center justify-center text-white text-5xl font-semibold">
            {getInitials(firstName)}
          </div>
        )}
        <button
          onClick={() => document.getElementById('imageInput')?.click()}
          className="absolute bottom-0 right-0 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
        >
          <FaPencilAlt className="mr-2" />
          Edit
        </button>
      </div>
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImageUpload;
