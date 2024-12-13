import React, { useState } from "react";

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  buttonStyle: string;
  optionStyle: string;
  selected?: string; // The selected value passed from the parent
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  buttonStyle,
  optionStyle,
  selected, // Use the selected prop directly
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    onSelect(option); // Notify parent about the selection
    setIsOpen(false); // Close the dropdown
  };

  return (
    <div className="relative">
      <button className={buttonStyle} onClick={toggleDropdown}>
        {selected || "Select a category"} {/* Use selected value or fallback */}
      </button>

      {isOpen && (
        <div className={optionStyle}>
          {options.map((option, index) => (
            <a
              key={index}
              onClick={() => handleSelect(option)}
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
