export type SortFlightOption = 'recommendation' | 'price' | 'duration';

export type SortOption = SortFlightOption;

export interface AppState {
  loading: boolean;
  content: unknown;
  loadingApp: boolean;
}

export interface FlightFiltersState {
  selectedAirlines: string[];
  priceRange: [number, number];
  durationRange: [number, number];
  sortOption: SortFlightOption;
}

export interface Flight {
  id: string;
  airline: {
    name: string;
    code: string;
  };
  flightNumber: string;
  departure: {
    time: string;
    airport: string;
    date: string;
  };
  arrival: {
    time: string;
    airport: string;
    date: string;
  };
  duration: number;
  baggage: string;
  price: {
    amount: number;
    currency: string;
  };
}