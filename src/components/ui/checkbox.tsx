'use client';

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  description?: string;
  error?: string;
  onChange?: (checked: boolean) => void;
  variant?: 'default' | 'rounded';
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  description,
  error,
  onChange,
  variant = 'default',
  className = '',
  disabled,
  ...props
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  const isChecked = props.checked;
  const baseClasses = 'relative w-5 h-5 border-2 rounded cursor-pointer flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2';
  const variantClasses = variant === 'rounded' ? 'rounded-full' : 'rounded-md';
  const stateClasses = disabled
    ? 'cursor-not-allowed bg-gray-100 border-gray-300 opacity-60'
    : isChecked
    ? 'bg-indigo-600 border-indigo-600'
    : error
    ? 'bg-white dark:bg-gray-600 border-red-500'
    : 'bg-white dark:bg-gray-600 border-gray-400 hover:border-indigo-500';

  const checkVariants = {
    unchecked: { scale: 0, opacity: 0 },
    checked: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <div className={cn("flex items-start space-x-3", className)}>
      <div className="relative shrink-0">
        <input
          type="checkbox"
          ref={ref}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only peer"
          {...props}
        />

        <motion.div
          className={cn(baseClasses, variantClasses, stateClasses)}
          whileHover={!disabled ? { scale: 1.02 } : undefined}
          whileTap={!disabled ? { scale: 0.95 } : undefined}
        >
          <motion.div
            variants={checkVariants}
            initial="unchecked"
            animate={isChecked ? "checked" : "unchecked"}
            className="flex items-center justify-center"
          >
            <Check className="w-3 h-3 text-white drop-shadow-sm" size={12} />
          </motion.div>
        </motion.div>
      </div>

      {(label || description || error) && (
        <div className="flex-1 min-w-0">
          {label && (
            <label className={cn(
              "text-sm font-medium cursor-pointer select-none",
              disabled ? 'text-gray-400' : 'text-gray-700',
              error ? 'text-red-600' : ''
            )}>
              {label}
            </label>
          )}

          {description && (
            <p className={cn(
              "text-xs mt-1",
              disabled ? 'text-gray-400' : 'text-gray-500'
            )}>
              {description}
            </p>
          )}

          {error && (
            <p className="text-xs text-red-600 mt-1 font-medium">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;