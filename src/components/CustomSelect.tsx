import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion } from "framer-motion";

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = {
  selected: string;
  onChange: (value: string) => void;
  options: Option[];
  up?: boolean;
};

function CustomSelect({
  selected,
  onChange,
  options,
  up = false,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
        className="w-full flex justify-between items-center px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options.find((opt) => opt.value === selected)?.label}
        <ChevronDown
          className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`}
          size={20}
        />
      </button>
      {open && (
        <motion.ul
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className={`absolute ${
            up ? `bottom-full mb-2` : "mt-2"
          }  w-full bg-white shadow-lg rounded-xl border border-gray-200 z-10`}
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className="px-4 py-3 flex justify-between items-center rounded-xl cursor-pointer hover:bg-gray-100"
            >
              {option.label}
              {selected === option.value && (
                <Check className="text-blue-500" size={18} />
              )}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

export default React.memo(CustomSelect);
