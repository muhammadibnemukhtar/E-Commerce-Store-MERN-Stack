import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomDropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Category");
  const navigate = useNavigate();

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    navigate(`/products/${option}`);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-gray-700 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
          <svg
            className="-mr-1 ml-1 mt-0.5 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5">
          <ul className="py-1 text-white">
            {options.map((option, index) => (
              <li
                key={index}
                className="block px-4 py-2 hover:bg-gray-600 hover:text-orange-500 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
