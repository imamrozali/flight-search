import { useQuery } from '@tanstack/react-query';
import { Flight, FlightFiltersState, SortOption } from '@/lib/types';

export const getCurrentTime = (): Date => {
  const currentTime = new Date();
  currentTime.setFullYear(2025, 9, 22); // Mock current date to October 22, 2025, Remove if not needed
  return currentTime;
};

export const parseDepartureTime = (flight: Flight): Date =>
  new Date(`${flight.departure.date}T${flight.departure.time}`);

export const parseBaggage = (baggage: string): number => {
  if (baggage.toLowerCase().includes('kg')) {
    return parseInt(baggage.replace(/[^0-9]/g, ''), 10);
  }
  if (baggage.toLowerCase().includes('piece')) {
    return 0;
  }
  return 0;
};

export const sortByRecommendation = (flights: Flight[]): Flight[] => {
  const now = getCurrentTime().getTime();

  return [...flights].sort((a, b) => {
    const timeA = parseDepartureTime(a).getTime() - now;
    const timeB = parseDepartureTime(b).getTime() - now;
    if (timeA !== timeB) return timeA - timeB;

    if (a.price.amount !== b.price.amount) return a.price.amount - b.price.amount;
    if (a.duration !== b.duration) return a.duration - b.duration;

    return parseBaggage(b.baggage) - parseBaggage(a.baggage);
  });
};

export const filterFlights = (
  flights: Flight[],
  filters: Pick<FlightFiltersState, 'selectedAirlines' | 'priceRange' | 'durationRange'>
): Flight[] => {
  const currentTime = getCurrentTime();

  return flights.filter(flight => {
    const departureTime = parseDepartureTime(flight);

    const isFutureFlight = departureTime >= currentTime;

    const isAirlineMatch =
      filters.selectedAirlines.length === 0 ||
      filters.selectedAirlines.includes(flight.airline.code);

    const isPriceInRange =
      flight.price.amount >= filters.priceRange[0] &&
      flight.price.amount <= filters.priceRange[1];

    const isDurationInRange =
      flight.duration >= filters.durationRange[0] &&
      flight.duration <= filters.durationRange[1];

    return (
      isFutureFlight &&
      isAirlineMatch &&
      isPriceInRange &&
      isDurationInRange
    );
  });
};

export const sortFlights = (flights: Flight[], sortOption: SortOption): Flight[] => {
  const flightsList = flights.slice();

  switch (sortOption) {
    case 'price':
      return flightsList.sort((a, b) => a.price.amount - b.price.amount);
    case 'duration':
      return flightsList.sort((a, b) => a.duration - b.duration);
    case 'recommendation':
    default:
      return sortByRecommendation(flightsList);
  }
};

export const useFlightQuery = () => {
  return useQuery({
    queryKey: ['flights'],
    queryFn: async (): Promise<Flight[]> => {
      const response = await fetch('/api/flights');
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }
      const result = await response.json();
      return result.data;
    },
  });
};