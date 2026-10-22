import { useState, useEffect, useRef } from "react";
import css from "./Filter.module.css";

const LANGUAGES = [
  "French",
  "English",
  "German",
  "Spanish",
  "Mandarin Chinese",
  "Italian",
  "Korean",
  "Vietnamese",
];
const LEVELS = [
  "A1 Beginner",
  "A2 Elementary",
  "B1 Intermediate",
  "B2 Upper-Intermediate",
  "C1 Advanced",
  "C2 Proficient",
];
const PRICES = [10, 20, 30, 40];

const Dropdown = ({ label, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={css.dropdown} ref={ref}>
      <p className={css.label}>{label}</p>
      <button
        type="button"
        className={css.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{value || placeholder}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          className={`${css.arrow} ${isOpen ? css.arrowOpen : ""}`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="#121417"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className={css.options}>
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                className={`${css.option} ${value === option ? css.optionActive : ""}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Filter = ({ filters, onFilterChange }) => {
  return (
    <div className={css.filters}>
      <Dropdown
        label="Languages"
        options={LANGUAGES}
        value={filters.language}
        onChange={(value) => onFilterChange("language", value)}
        placeholder="Language"
      />
      <Dropdown
        label="Level of knowledge"
        options={LEVELS}
        value={filters.level}
        onChange={(value) => onFilterChange("level", value)}
        placeholder="Level"
      />
      <Dropdown
        label="Price"
        options={PRICES.map((p) => `${p} $`)}
        value={filters.price ? `${filters.price} $` : ""}
        onChange={(value) =>
          onFilterChange("price", Number(value.split(" ")[0]))
        }
        placeholder="Price"
      />
    </div>
  );
};

export default Filter;
