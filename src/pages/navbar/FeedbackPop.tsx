import React from "react";

interface FeedbackPopProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FeedbackPop: React.FC<FeedbackPopProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 rounded-xl">
      <div className="bg-zinc-900 p-4 rounded-xl shadow-lg relative w-[90vw] md:w-[60vw]">
        <button className="absolute top-2 right-2" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default FeedbackPop;
