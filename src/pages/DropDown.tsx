import React, { useState } from "react";
interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  children: React.ReactNode;
  buttonStyle: string;
  optionStyle: string;
}
const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  children,
  buttonStyle,
  optionStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button className={buttonStyle} onClick={toggleDropdown}>
        {children}
      </button>

      {isOpen && (
        <div className={optionStyle}>
          {options.map((option, index) => (
            <a
              key={index}
              href="#"
              onClick={() => onSelect(option)}
              className="block px-4 py-2 hover:bg-gray-100"
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
