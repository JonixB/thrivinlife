import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  currentImage: string;
  onImageUpload: (file: File) => void;
}

const ProfileImageUpload: React.FC<Props> = ({ currentImage, onImageUpload }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);

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
        <img
          src={currentImage || 'path/to/default/avatar.png'}
          alt="Profile"
          className="h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 rounded-full object-cover"
        />
        <button
          onClick={() => document.getElementById('imageInput')?.click()}
          className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
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
