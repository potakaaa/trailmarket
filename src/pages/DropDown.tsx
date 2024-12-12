import React, { useState } from "react";

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  buttonStyle: string;
  optionStyle: string;
  selected?: string; // Make the selected prop optional
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  buttonStyle,
  optionStyle,
  selected, // Destructure the selected prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(
    selected || options[0]
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button className={buttonStyle} onClick={toggleDropdown}>
        {selectedOption}
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
