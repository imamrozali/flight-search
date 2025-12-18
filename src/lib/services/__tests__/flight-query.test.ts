import {
  getCurrentTime,
  parseDepartureTime,
  parseBaggage,
  sortByRecommendation,
  filterFlights,
  sortFlights,
} from '../flight-query';
import { Flight, FlightFiltersState } from '@/lib/types';

const mockFlights: Flight[] = [
  {
    id: '1',
    airline: { code: 'GA', name: 'Garuda Indonesia' },
    flightNumber: 'GA101',
    departure: {
      airport: 'CGK',
      time: '08:00',
      date: '2025-10-25',
    },
    arrival: {
      airport: 'DPS',
      time: '10:00',
      date: '2025-10-25',
    },
    duration: 120,
    price: { amount: 1000000, currency: 'IDR' },
    baggage: '20kg',
  },
  {
    id: '2',
    airline: { code: 'JT', name: 'Lion Air' },
    flightNumber: 'JT202',
    departure: {
      airport: 'CGK',
      time: '12:00',
      date: '2025-10-25',
    },
    arrival: {
      airport: 'DPS',
      time: '14:00',
      date: '2025-10-25',
    },
    duration: 180,
    price: { amount: 800000, currency: 'IDR' },
    baggage: '15kg',
  },
  {
    id: '3',
    airline: { code: 'GA', name: 'Garuda Indonesia' },
    flightNumber: 'GA303',
    departure: {
      airport: 'CGK',
      time: '06:00',
      date: '2025-10-26',
    },
    arrival: {
      airport: 'DPS',
      time: '08:00',
      date: '2025-10-26',
    },
    duration: 120,
    price: { amount: 1200000, currency: 'IDR' },
    baggage: '20kg',
  },
];

describe('Flight Query Services', () => {
  describe('getCurrentTime', () => {
    it('should return current time with year 2025', () => {
      const result = getCurrentTime();
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(9);
      expect(result.getDate()).toBeGreaterThanOrEqual(20);
      expect(result.getDate()).toBeLessThanOrEqual(31);
    });

    it('should return a Date object', () => {
      const result = getCurrentTime();
      expect(result).toBeInstanceOf(Date);
    });
  });

  describe('parseDepartureTime', () => {
    it('should parse flight departure time correctly', () => {
      const result = parseDepartureTime(mockFlights[0]);
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(9);
      expect(result.getDate()).toBe(25);
      expect(result.getHours()).toBe(8);
      expect(result.getMinutes()).toBe(0);
    });
  });

  describe('parseBaggage', () => {
    it('should parse baggage with kg correctly', () => {
      expect(parseBaggage('20kg')).toBe(20);
      expect(parseBaggage('30 kg')).toBe(30);
      expect(parseBaggage('15KG')).toBe(15);
    });

    it('should return 0 for piece baggage', () => {
      expect(parseBaggage('1 piece')).toBe(0);
      expect(parseBaggage('2 Piece')).toBe(0);
    });

    it('should return 0 for unknown baggage format', () => {
      expect(parseBaggage('unknown')).toBe(0);
      expect(parseBaggage('')).toBe(0);
      expect(parseBaggage('10')).toBe(0);
    });
  });

  describe('sortByRecommendation', () => {

    it('should sort flights by recommendation (earliest departure, then price, duration, baggage)', () => {
      const result = sortByRecommendation(mockFlights.slice(0, 2));

      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('2');
    });

    it('should not mutate original array', () => {
      const original = [...mockFlights.slice(0, 2)];
      sortByRecommendation(mockFlights.slice(0, 2));
      expect(mockFlights.slice(0, 2)).toEqual(original);
    });
  });

  describe('filterFlights', () => {

    it('should filter by airline', () => {
      const filters: Pick<FlightFiltersState, 'selectedAirlines' | 'priceRange' | 'durationRange'> = {
        selectedAirlines: ['GA'],
        priceRange: [0, 2000000],
        durationRange: [0, 300],
      };

      const result = filterFlights(mockFlights, filters);
      expect(result).toHaveLength(2);
      expect(result.every(f => f.airline.code === 'GA')).toBe(true);
    });

    it('should filter by price range', () => {
      const filters: Pick<FlightFiltersState, 'selectedAirlines' | 'priceRange' | 'durationRange'> = {
        selectedAirlines: [],
        priceRange: [900000, 1100000],
        durationRange: [0, 300],
      };

      const result = filterFlights(mockFlights, filters);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('1');
    });

    it('should filter by duration range', () => {
      const filters: Pick<FlightFiltersState, 'selectedAirlines' | 'priceRange' | 'durationRange'> = {
        selectedAirlines: [],
        priceRange: [0, 2000000],
        durationRange: [150, 200],
      };

      const result = filterFlights(mockFlights, filters);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('2');
    });

    it('should filter future flights only', () => {
      const filters: Pick<FlightFiltersState, 'selectedAirlines' | 'priceRange' | 'durationRange'> = {
        selectedAirlines: [],
        priceRange: [0, 2000000],
        durationRange: [0, 300],
      };

      const result = filterFlights(mockFlights, filters);
      expect(result).toHaveLength(3);
      expect(result.every(f => parseDepartureTime(f) >= getCurrentTime())).toBe(true);
    });

    it('should return all flights when no filters applied', () => {
      const filters: Pick<FlightFiltersState, 'selectedAirlines' | 'priceRange' | 'durationRange'> = {
        selectedAirlines: [],
        priceRange: [0, 2000000],
        durationRange: [0, 300],
      };

      const result = filterFlights(mockFlights, filters);
      expect(result).toHaveLength(3);
    });

    it('should handle empty flights array', () => {
      const filters: Pick<FlightFiltersState, 'selectedAirlines' | 'priceRange' | 'durationRange'> = {
        selectedAirlines: [],
        priceRange: [0, 2000000],
        durationRange: [0, 300],
      };

      const result = filterFlights([], filters);
      expect(result).toHaveLength(0);
    });
  });

  describe('sortFlights', () => {

    const sortTestFlights = mockFlights.slice(0, 2);

    it('should sort by price', () => {
      const result = sortFlights(sortTestFlights, 'price');
      expect(result[0].price.amount).toBeLessThanOrEqual(result[1].price.amount);
    });

    it('should sort by duration', () => {
      const result = sortFlights(sortTestFlights, 'duration');
      expect(result[0].duration).toBeLessThanOrEqual(result[1].duration);
    });

    it('should sort by recommendation as default', () => {
      const result = sortFlights(sortTestFlights, 'recommendation');
      expect(result[0].id).toBe('1');
      expect(result[1].id).toBe('2');
    });

    it('should not mutate original array', () => {
      const original = [...sortTestFlights];
      sortFlights(sortTestFlights, 'price');
      expect(sortTestFlights).toEqual(original);
    });
  });
});