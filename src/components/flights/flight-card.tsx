'use client';


import { Plane, Clock, Luggage, ChevronRight, Ticket } from 'lucide-react';
import Image from 'next/image';
import { Flight } from '@/lib/types';
import { formatPrice, formatDuration } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
interface FlightCardProps {
  flight: Flight;
  onSelect: (flight: Flight) => void;
}

const FlightCard = ({ flight, onSelect }: FlightCardProps) => {
  return (
    <div
      className="group relative w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer p-4"
    >
      <div className="flex flex-col gap-2">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0 bg-gray-50 rounded-xl p-1 shadow-inner group-hover:bg-white transition-colors">
              <Image
                src={`https://www.gstatic.com/flights/airline_logos/70px/${flight.airline.code}.png`}
                alt={flight.airline.name}
                fill
                sizes="(max-width: 768px) 32px, 40px"
                className="object-contain p-1"
              />
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight">
                {flight.airline.name}
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                <Ticket className="text-indigo-400" size={12} />
                {flight.flightNumber}
              </div>
            </div>
          </div>

            <div className="hidden md:block text-right">
              <p className="text-[11px] text-gray-400 dark:text-gray-500 uppercase font-semibold">Price per person</p>
              <p className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                {formatPrice(flight.price.amount, flight.price.currency)}
              </p>
            </div>
        </div>

        <div className="flex items-center justify-between gap-1 md:gap-6">
           <div className="flex-1 text-left">
              <p className="text-base md:text-2xl font-black text-gray-900 dark:text-gray-100 leading-none mb-1">
                {flight.departure.time}
              </p>
             <p className="text-xs md:text-sm font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide">
               {flight.departure.airport}
             </p>
           </div>

           <div className="flex-[1.5] flex flex-col items-center">
             <span className="text-[10px] md:text-xs text-gray-400 dark:text-gray-500 font-bold mb-2">
               {formatDuration(flight.duration)}
             </span>
             <div className="relative w-full flex items-center justify-center">
               <div className="absolute w-full h-0.5 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
               <div className="absolute left-0 w-0 group-hover:w-full h-0.5 bg-indigo-400 dark:bg-indigo-500 transition-all duration-700 ease-in-out"></div>

               <div className="relative bg-white dark:bg-gray-800 px-2 md:px-3 z-10 transition-transform duration-500 group-hover:translate-x-2">
                 <Plane className="text-indigo-500 dark:text-indigo-400 text-[10px] md:text-base" size={16} />
               </div>
             </div>
             <span className="text-[9px] text-gray-400 dark:text-gray-500 mt-2 uppercase font-medium">Direct</span>
           </div>

           <div className="flex-1 text-right">
              <p className="text-base md:text-2xl font-black text-gray-900 dark:text-gray-100 leading-none mb-1">
                {flight.arrival.time}
              </p>
             <p className="text-xs md:text-sm font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide">
               {flight.arrival.airport}
             </p>
           </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-4 border-t border-dashed border-gray-200 dark:border-gray-700 gap-3">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-700 rounded-lg text-[11px] font-bold text-gray-500 dark:text-gray-400">
              <Clock className="text-indigo-400 dark:text-indigo-500" size={12} />
              {flight.departure.date}
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
              <Luggage className="text-indigo-600 dark:text-indigo-400" size={12} />
              {flight.baggage}
            </div>
          </div>

          <div className="flex items-center justify-between w-full md:w-auto md:gap-3">
            <div className="md:hidden">
              <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-tight">Price</p>
              <p className="text-base font-black text-indigo-600 dark:text-indigo-400 leading-none">
                {formatPrice(flight.price.amount, flight.price.currency)}
              </p>
            </div>

            <Button onClick={() => onSelect(flight)} variant="secondary" size="sm" className="bg-gray-900 hover:bg-indigo-600 text-white dark:bg-gray-700 dark:hover:bg-indigo-500">
              Book <ChevronRight className="text-[10px]" size={10} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;