'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import { SortFlightOption } from '@/lib/types';
import { cn } from '@/lib/utils';

interface DropdownProps {
  value: SortFlightOption;
  onChange: (value: SortFlightOption) => void;
  options: { value: SortFlightOption; label: string }[];
}

const Dropdown = ({ value, onChange, options }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer justify-between min-w-45 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-slate-600 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all text-gray-700 dark:text-slate-300 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Sort flights by"
      >
        <div className="flex flex-col items-start leading-tight text-left">
          <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Sort by</span>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{selectedOption?.label}</span>
        </div>
        <FaChevronDown className={cn("ml-3 w-3 h-3 text-gray-400 transition-transform duration-200", isOpen ? 'rotate-180' : '')} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-transparent cursor-default"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.1 }}
              className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-100 dark:border-slate-600 rounded-xl shadow-xl z-50 overflow-hidden"
              role="listbox"
            >
              <div className="flex flex-col">
                {options.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full cursor-pointer text-left px-4 py-3 text-sm transition-colors flex items-center justify-between",
                      index === 0 ? 'rounded-t-xl' : '',
                      index === options.length - 1 ? 'rounded-b-xl border-none' : 'border-b border-gray-50',
                      option.value === value
                        ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400'
                    )}
                    role="option"
                    aria-selected={option.value === value}
                  >
                    <span>{option.label}</span>
                    {option.value === value && <FaCheck className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;