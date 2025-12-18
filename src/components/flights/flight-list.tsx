'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import FlightCard from '@/components/flights/flight-card';
import { Flight } from '@/lib/types';
import { useFlightQuery, filterFlights, sortFlights } from '@/lib/services/flight-query';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { formatPrice } from '@/lib/formatters';
import { useVirtualGrid } from '@/hooks/use-virtual-grid';

export default function FlightList() {
  const { data: allFlights = [], isLoading } = useFlightQuery();
  const { selectedAirlines, priceRange, durationRange, sortOption } = useSelector((state: RootState) => state.filters);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  const filters = { selectedAirlines, priceRange, durationRange };
  const filteredFlights = filterFlights(allFlights, filters);
  const flights = sortFlights(filteredFlights, sortOption);

  useEffect(() => {
    const measureContainer = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDimensions({
          width: rect.width,
          height: window.innerHeight - rect.top,
        });
      }
    };

    measureContainer();
    window.addEventListener('resize', measureContainer);
    return () => window.removeEventListener('resize', measureContainer);
  }, []);

  const itemWidth = useMemo(() => {
    if (containerDimensions.width >= 1536) {
      return (containerDimensions.width - 2 * 12) / 3;
    } else if (containerDimensions.width >= 1024) {
      return (containerDimensions.width - 12) / 2;
    } else {
      return containerDimensions.width;
    }
  }, [containerDimensions.width]);

  const itemHeight = 230;
  const gap = 12;

  const { parentRef, getVirtualItems, totalHeight } = useVirtualGrid({
    count: flights.length,
    itemHeight,
    itemWidth,
    gap,
    containerWidth: containerDimensions.width,
  });

  const handleSelectFlight = (flight: Flight) => {
    setSelectedFlight(flight);
  };

  const handleConfirmBooking = () => {
    setSelectedFlight(null);
  };

  if (isLoading) {
    return (
      <div
        ref={containerRef}
        className="relative overflow-auto py-6"
        style={{ height: containerDimensions.height }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3 pb-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl shadow-sm p-4 animate-pulse">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-xl shrink-0" />
                    <div className="flex flex-col gap-1">
                     <div className="w-28 h-3 bg-gray-200 rounded" />
                     <div className="w-18 h-2.5 bg-gray-200 rounded mt-1" />
                    </div>
                  </div>
                   <div className="md:block flex flex-col items-end gap-1">
                    <div className="w-20 h-2.5 bg-gray-200 rounded" />
                    <div className="w-10 h-4 bg-gray-200 rounded mt-1" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 md:gap-8">
                   <div className="flex-1 flex flex-col gap-0.5">
                     <div className="w-12 h-4 bg-gray-200 rounded" />
                     <div className="w-10 h-2.5 bg-gray-200 rounded" />
                   </div>

                   <div className="flex-[1.5] flex flex-col items-center gap-0.5">
                     <div className="w-14 h-1.5 bg-gray-200 rounded" />
                     <div className="w-full h-0.5 bg-gray-200 rounded mt-2" />
                     <div className="w-5 h-5 bg-gray-200 rounded-full mt-1" />
                     <div className="w-10 h-1.5 bg-gray-200 rounded mt-1" />
                  </div>

                   <div className="flex-1 flex flex-col gap-0.5 items-end">
                     <div className="w-12 h-4 bg-gray-200 rounded" />
                     <div className="w-10 h-2.5 bg-gray-200 rounded" />
                   </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between pt-4 border-t border-dashed border-gray-200 gap-3">
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="w-16 h-5 bg-gray-200 rounded" />
                    <div className="w-12 h-5 bg-gray-200 rounded" />
                  </div>
                    <div className="flex items-center justify-between w-full md:w-auto md:gap-3">
                    <div className="md:hidden w-20 h-5 bg-gray-200 rounded" />
                    <div className="w-16 h-7 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!flights || flights.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No flights available</p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        className="relative overflow-auto py-6"
        style={{ height: containerDimensions.height }}
      >
        <div
          ref={parentRef}
          className="relative"
          style={{ height: totalHeight, width: '100%' }}
        >
          {getVirtualItems().map(({ index, style }) => {
            const flight = flights[index];
            return (
              <div
                key={flight.id}
                style={style}
              >
                <FlightCard
                  flight={flight}
                  onSelect={handleSelectFlight}
                />
              </div>
            );
          })}
        </div>
      </div>

      {selectedFlight && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Confirm Booking</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Airline:</span>
                <span className="font-medium dark:text-gray-200">{selectedFlight.airline.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Flight:</span>
                <span className="font-medium dark:text-gray-200">{selectedFlight.flightNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Route:</span>
                <span className="font-medium dark:text-gray-200">{selectedFlight.departure.airport} → {selectedFlight.arrival.airport}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Price:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{formatPrice(selectedFlight.price.amount, selectedFlight.price.currency)}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleConfirmBooking}
                className="flex-1 bg-indigo-600 dark:bg-indigo-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
              >
                Confirm Booking
              </button>
              <button
                onClick={() => setSelectedFlight(null)}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}