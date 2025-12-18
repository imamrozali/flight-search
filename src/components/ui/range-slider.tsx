'use client';

import React, { useRef, useCallback, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label: string;
  formatValue?: (value: number) => string;
}

const RangeSlider = React.memo(({
  min, max, value, onChange, label, formatValue
}: RangeSliderProps) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const isReadyRef = useRef(false);

  const leftThumbX = useMotionValue(0);
  const rightThumbX = useMotionValue(0);
  const activeWidth = useMotionValue(0);

  const [localMin, setLocalMin] = useState(value[0]);
  const [localMax, setLocalMax] = useState(value[1]);

  useEffect(() => {
    setLocalMin(value[0]);
    setLocalMax(value[1]);
  }, [value]);

  const updateThumbPositions = useCallback(() => {
    if (constraintsRef.current && max !== min) {
      const width = constraintsRef.current.offsetWidth;
      if (width > 0) {
        const leftPos = ((localMin - min) / (max - min)) * width;
        const rightPos = ((localMax - min) / (max - min)) * width;

        leftThumbX.set(Math.min(leftPos, width));
        rightThumbX.set(Math.min(rightPos, width));
        activeWidth.set(Math.max(0, Math.min(rightPos, width) - Math.min(leftPos, width)));
        isReadyRef.current = true;
      }
    }
  }, [localMin, localMax, min, max, activeWidth, leftThumbX, rightThumbX]);

  useEffect(() => {
    const handleResize = () => {
      updateThumbPositions();
    };

    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(handleResize);
    if (constraintsRef.current) {
      resizeObserver.observe(constraintsRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [updateThumbPositions]);

  const handleDrag = useCallback(() => {
    if (!constraintsRef.current) return;
    const width = constraintsRef.current.offsetWidth;
    if (width <= 0) return;

    let currentMin = Math.round(((leftThumbX.get() / width) * (max - min) + min));
    let currentMax = Math.round(((rightThumbX.get() / width) * (max - min) + min));

    if (Math.abs(rightThumbX.get() - width) < 5) {
      currentMax = max;
    }

    if (currentMin >= currentMax) {
      currentMin = currentMax;
    }

    currentMin = Math.max(min, Math.min(currentMin, max));
    currentMax = Math.max(min, Math.min(currentMax, max));

    activeWidth.set(rightThumbX.get() - leftThumbX.get());

    if (currentMin !== localMin || currentMax !== localMax) {
      setLocalMin(currentMin);
      setLocalMax(currentMax);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange([currentMin, currentMax]);
      }, 10);
    }
  }, [localMin, localMax, min, max, onChange, leftThumbX, rightThumbX, activeWidth]);

  const format = formatValue || ((val: number) => val.toString());

  return (
    <div className="w-full px-3 select-none">
      <div className="flex flex-col gap-2 mb-3">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          {label}
        </label>
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-gray-800/80 px-2 py-0.5 rounded-md border border-indigo-200/50 dark:border-slate-700/50 shadow-sm">
            {format(localMin)}
          </span>
          <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-gray-800/80 px-2 py-0.5 rounded-md border border-indigo-200/50 dark:border-slate-700/50 shadow-sm">
            {format(localMax)}
          </span>
        </div>
      </div>

      <div className="px-1 transition-opacity duration-300 opacity-100">
        <div ref={constraintsRef} className="relative w-full min-w-[200px] h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full shadow-inner">
          <motion.div
            className="absolute h-full bg-linear-to-r from-indigo-500 to-indigo-600 rounded-full shadow-sm"
            style={{
              left: leftThumbX,
              width: activeWidth,
            }}
          />

            <motion.div
             drag="x"
             dragConstraints={constraintsRef}
             dragElastic={0}
             dragMomentum={false}
             onDrag={handleDrag}
             style={{ x: leftThumbX }}
             className="absolute top-1/2 -translate-y-1/2 -ml-2.5 h-5 w-5 cursor-grab active:cursor-grabbing rounded-full bg-white border-2 border-indigo-500 shadow-lg hover:shadow-xl transition-shadow z-20"
             role="slider"
             aria-label={`Minimum ${label}`}
             aria-valuemin={min}
             aria-valuemax={max}
             aria-valuenow={localMin}
             tabIndex={0}
           />

           <motion.div
             drag="x"
             dragConstraints={constraintsRef}
             dragElastic={0}
             dragMomentum={false}
             onDrag={handleDrag}
             style={{ x: rightThumbX }}
             className="absolute top-1/2 -translate-y-1/2 -ml-2.5 h-5 w-5 cursor-grab active:cursor-grabbing rounded-full bg-white border-2 border-indigo-500 shadow-lg hover:shadow-xl transition-shadow z-10"
             role="slider"
             aria-label={`Maximum ${label}`}
             aria-valuemin={min}
             aria-valuemax={max}
             aria-valuenow={localMax}
             tabIndex={0}
           />
        </div>
      </div>
    </div>
  );
});

RangeSlider.displayName = "RangeSlider";

export default RangeSlider;