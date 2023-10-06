import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full p-4 bg-opacity-50 backdrop-blur-md z-50">
      <div className="max-w-xl mx-auto flex justify-center items-center">
        <span className="text-gray-700">
          <span className="text-black">&#169;</span> ThrivinLife 2023
        </span>
      </div>
    </footer>
  );
};

export default Footer;
