import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex">
      {Array.from({ length: fullStars }).map((_, index) => (
        <FaStar key={`full-${index}`} className="text-black w-6 h-6" />
      ))}

      {halfStar && <FaStarHalfAlt key="half" className="text-black w-6 h-6" />}

      {Array.from({ length: emptyStars }).map((_, index) => (
        <FaRegStar key={`empty-${index}`} className="text-gray-300 w-6 h-6" />
      ))}
    </div>
  );
};

interface StarProps {
  filled: boolean;
  half: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Star = ({
  filled,
  half,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: StarProps) => {
  if (half) {
    return (
      <FaStarHalfAlt
        className="w-6 h-6 cursor-pointer text-black"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  }
  return filled ? (
    <FaStar
      className="w-6 h-6 cursor-pointer text-black"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  ) : (
    <FaRegStar
      className="w-6 h-6 cursor-pointer text-gray-300"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

export const StarRating = ({ rating, setRating }: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleClick = (index: number, isHalf: boolean) => {
    setRating(isHalf ? index + 0.5 : index + 1);
  };

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="relative"
          onMouseLeave={() => setHoverRating(null)}
        >
          <Star
            filled={index < Math.floor(hoverRating ?? rating)}
            half={(hoverRating ?? rating) === index + 0.5}
            onClick={() => handleClick(index, false)}
            onMouseEnter={() => setHoverRating(index + 1)}
            onMouseLeave={() => setHoverRating(null)}
          />
          <div
            className="absolute top-0 left-0 w-1/2 h-full"
            style={{ pointerEvents: "all", zIndex: 10 }}
            onMouseEnter={() => setHoverRating(index + 0.5)}
            onClick={() => handleClick(index, true)}
          />
        </div>
      ))}
    </div>
  );
};
