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
