import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './Dropdown.css';

const Dropdown = ({ options, value, onChange, placeholder = "Select an option", className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Find label for current value
  const selectedOption = options.find(opt => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={`custom-dropdown ${className}`} ref={dropdownRef}>
      <div 
        className={`dropdown-header ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayLabel}</span>
        <FiChevronDown className={`dropdown-icon ${isOpen ? 'rotated' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="dropdown-list-container">
          <ul className="dropdown-list">
            {options.map((option, index) => (
              <li 
                key={index} 
                className={`dropdown-list-item ${option.value === value ? 'selected' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
