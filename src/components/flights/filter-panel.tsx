'use client';


import { formatPrice, formatDuration } from '@/lib/formatters';
import RangeSlider from '@/components/ui/range-slider';
import Checkbox from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useFilterPanel } from '@/hooks/use-filter-panel';
const FilterPanel = () => {
  const {
    airlines,
    selectedAirlines,
    priceRange,
    durationRange,
    priceMinMax,
    durationMinMax,
    handleAirlineChange,
    selectAll,
    handleReset,
    onPriceChange,
    onDurationChange,
    isLoading,
  } = useFilterPanel();

  if (isLoading) {
    return (
      <div className="w-full p-3 bg-white dark:bg-gray-900 lg:min-h-screen lg:overflow-y-auto lg:sticky lg:top-0 lg:self-start">
        <div className="flex items-center justify-between mb-2">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
        </div>

        <div className="border-t border-dashed border-gray-200 dark:border-slate-600 my-4"></div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2 p-1">
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-dashed border-gray-200 dark:border-slate-600 my-4"></div>

        <div className="space-y-3">
          <div className="py-4">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"></div>
            <div className="flex justify-between mt-2">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
            </div>
            <div className="py-2">
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="py-4">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-32"></div>
            <div className="flex justify-between mt-2">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20"></div>
            </div>
            <div className="py-2">
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-3 bg-white dark:bg-gray-900 lg:min-h-screen lg:overflow-y-auto lg:sticky lg:top-0 lg:self-start">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-black text-gray-900 dark:text-slate-100 tracking-tight">Filters</h2>
        <Button
          onClick={handleReset}
          variant="link"
          size="sm"
        >
          Reset All
        </Button>
      </div>

      <div className="border-t border-dashed border-gray-300 my-4 dark:border-slate-700"></div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Airlines</label>
          <Button
            onClick={selectAll}
            variant="link"
            size="sm"
          >
            Select All
          </Button>
        </div>
        <div className="space-y-0.5">
          {airlines.map((airline) => (
            <label
              key={airline.code}
              className="flex items-center space-x-2 cursor-pointer group p-1 rounded-lg hover:bg-indigo-50/60 hover:shadow-sm transition-all duration-200"
            >
              <Checkbox
                checked={selectedAirlines.includes(airline.code)}
                onChange={(checked) => handleAirlineChange(airline.code, checked)}
              />

              <div className="w-8 h-8 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:border-indigo-200 group-hover:shadow-sm transition-all duration-200">
                <Image
                 src={`https://www.gstatic.com/flights/airline_logos/70px/${airline.code}.png`}
                  alt={airline.name}
                  width={25}
                  height={25}
                  sizes="25px"
                  className="object-contain"
                />
              </div>

              <span className="text-sm font-medium text-gray-600 dark:text-gray-50 group-hover:text-indigo-700 transition-colors duration-200">
                {airline.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-dashed border-gray-300 my-4 dark:border-slate-700"></div>

      <div className="space-y-3">
        <RangeSlider
          min={priceMinMax[0]}
          max={priceMinMax[1]}
          value={priceRange}
          onChange={onPriceChange}
          label="Price Range"
          formatValue={(value: number) => formatPrice(value, 'IDR')}
        />

        <RangeSlider
          min={durationMinMax[0]}
          max={durationMinMax[1]}
          value={durationRange}
          onChange={onDurationChange}
          label="Flight Duration"
          formatValue={(value: number) => formatDuration(value)}
        />
      </div>
    </div>
  );
};

export default FilterPanel;