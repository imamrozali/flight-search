'use client';

import dynamic from 'next/dynamic';

const FlightDropdown = dynamic(
  () => import('@/components/flights/flight-dropdown'),
  { ssr: false }
);

const ThemeSwitch = dynamic(
  () => import('../ui/theme-switch'),
  { ssr: false }
);

interface HeaderProps {
  type?: 'flight';
}

export default function Header({ type = 'flight' }: HeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 h-16">
        <div className="flex items-center space-x-4 w-full justify-end">
          <div className="flex items-center space-x-3">
            {type === 'flight' && <FlightDropdown />}
           <ThemeSwitch />
          </div>
        </div>
      </div>
    </>
  );
}