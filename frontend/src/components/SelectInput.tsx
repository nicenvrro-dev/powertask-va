import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, type LucideIcon } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectInputProps {
  value: string | number | null;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  icon?: LucideIcon;
  label?: string;
  required?: boolean;
}

export default function SelectInput({
  value,
  onChange,
  options,
  placeholder = "Select an option...",
  disabled = false,
  className = "",
  icon: Icon,
  label,
  required = false,
}: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          const option = options[focusedIndex];
          if (!option.disabled) {
            onChange(option.value);
            setIsOpen(false);
            setFocusedIndex(-1);
          }
        } else {
          setIsOpen(!isOpen);
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const nextIndex =
            focusedIndex < options.length - 1 ? focusedIndex + 1 : 0;
          setFocusedIndex(nextIndex);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          const prevIndex =
            focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
          setFocusedIndex(prevIndex);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  const handleOptionClick = (option: SelectOption) => {
    if (!option.disabled) {
      onChange(option.value);
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
          {Icon && <Icon className="w-4 h-4" />}
          <span>
            {label} {required && <span className="text-red-500">*</span>}
          </span>
        </label>
      )}

      <div ref={selectRef} className="relative">
        <motion.div
          className={`relative w-full cursor-pointer ${className}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          whileTap={disabled ? {} : { scale: 0.995 }}
        >
          <div className="flex items-center justify-between">
            <span
              className={`
              ${selectedOption ? "text-primary font-medium" : "text-gray-500"}
              ${disabled ? "text-gray-400" : ""}
            `}
            >
              {selectedOption?.label || placeholder}
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown
                className={`w-5 h-5 ${
                  disabled ? "text-gray-400" : "text-gray-600"
                }`}
              />
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{
                duration: 0.15,
                ease: [0.4, 0.0, 0.2, 1],
                opacity: { duration: 0.1 },
              }}
              className="absolute z-[9999] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto custom-scrollbar"
              role="listbox"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.1 }}
              >
                {options.map((option, index) => (
                  <motion.div
                    key={option.value}
                    className={`
                      px-4 py-3 cursor-pointer transition-colors duration-150
                      flex items-center justify-between
                      ${
                        option.disabled
                          ? "text-gray-400 cursor-not-allowed bg-gray-50"
                          : "text-gray-900 hover:bg-blue-50"
                      }
                      ${focusedIndex === index ? "bg-blue-100" : ""}
                      ${
                        value === option.value ? "bg-blue-50 text-blue-700" : ""
                      }
                    `}
                    onClick={() => handleOptionClick(option)}
                    role="option"
                    aria-selected={value === option.value}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02, duration: 0.15 }}
                    whileHover={
                      option.disabled
                        ? {}
                        : { backgroundColor: "rgba(59, 130, 246, 0.1)" }
                    }
                  >
                    <span className="flex-1">{option.label}</span>
                    {value === option.value && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Check className="w-4 h-4 text-blue-600" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
