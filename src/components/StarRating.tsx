import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';  // Import icons from react-icons

interface StarRatingProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => onRatingChange(star)}
          className="text-yellow-400 text-xl cursor-pointer"
        >
          {star <= rating ? <FaStar /> : <FaRegStar />}
        </button>
      ))}
    </div>
  );
};

export default StarRating;