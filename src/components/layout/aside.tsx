'use client';

import { useState, useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-is-mobile';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import FilterPanel from '../flights/filter-panel';

interface AsideProps {
  type?: 'flight';
}

export default function Aside({ type = 'flight' }: AsideProps) {
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  return (
    <aside
      className={cn(
        "fixed lg:sticky inset-y-0 left-0 h-full bg-white dark:bg-gray-900 shadow-xl z-50 border-r border-gray-200 dark:border-slate-600  transition-all duration-300 ease-in-out overflow-hidden",
        isCollapsed ? '-ml-64' : 'w-72'
      )}
    >
       <Button
          variant="ghost"
          size="icon"
           className={cn(
             "lg:hidden bg-white border border-gray-200 dark:border-gray-600 dark:bg-gray-800 fixed mt-2 flex justify-center transition-all duration-300 ease-in-out",
             isCollapsed ? "left-2" : "left-74"
           )}
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand filters panel" : "Collapse filters panel"}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? (
            <SlidersHorizontal size={20} className="text-gray-500" aria-hidden="true" />
          ) : (
            <X size={20} className="text-gray-500" aria-hidden="true" />
          )}
       </Button>
      <div className="flex flex-col space-y-2 h-screen">
        {type === 'flight' && <FilterPanel />}
      </div>
    </aside>
  );
}
