import { useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { setFlightSelectedAirlines, setFlightPriceRange, setFlightDurationRange } from '@/lib/slices/flightSlice';
import { setAppLoading } from '@/lib/slices/appSlice';
import { useDebouncedCallback } from '@/hooks/use-debounce';
import { useFlightQuery } from '@/lib/services/flight-query';
import { Flight } from '@/lib/types';

interface Airline {
  code: string;
  name: string;
}

interface UseFilterPanelReturn {
  airlines: Airline[];
  selectedAirlines: string[];
  priceRange: [number, number];
  durationRange: [number, number];
  priceMinMax: [number, number];
  durationMinMax: [number, number];
  handleAirlineChange: (code: string, checked: boolean) => void;
  selectAll: () => void;
  handleReset: () => void;
  onPriceChange: (value: [number, number]) => void;
  onDurationChange: (value: [number, number]) => void;
  isLoading: boolean;
}

export const useFilterPanel = (): UseFilterPanelReturn => {
  const dispatch = useDispatch();
  const { data: allFlights = [], isLoading: queryLoading } = useFlightQuery();
  const { selectedAirlines, priceRange, durationRange } = useSelector((state: RootState) => state.filters);
  const { loadingFilter } = useSelector((state: RootState) => state.app);





  const airlines = useMemo(() => {
    if (queryLoading || loadingFilter) return [];

    const unique = new Set(allFlights.map(f => f.airline.code));
    return Array.from(unique).map(code => ({
      code,
      name: allFlights.find(f => f.airline.code === code)?.airline.name || code,
    }));
  }, [allFlights, queryLoading, loadingFilter]);

  const priceMinMax = useMemo(() => {
    if (queryLoading || loadingFilter || allFlights.length === 0) return [0, 1000000] as [number, number];
    const prices = allFlights.map((f: Flight) => f.price.amount);
    return [Math.min(...prices), Math.max(...prices)] as [number, number];
  }, [allFlights, queryLoading, loadingFilter]);

  const durationMinMax = useMemo(() => {
    if (queryLoading || loadingFilter || allFlights.length === 0) return [0, 1440] as [number, number];
    const durations = allFlights.map((f: Flight) => f.duration);
    return [Math.min(...durations), Math.max(...durations)] as [number, number];
  }, [allFlights, queryLoading, loadingFilter]);

  const handleAirlineChange = useCallback((code: string, checked: boolean) => {
    dispatch(setAppLoading(true));
    try {
      const newSelected = checked
        ? [...selectedAirlines, code]
        : selectedAirlines.filter((a: string) => a !== code);
      dispatch(setFlightSelectedAirlines(newSelected));
    } finally {
      dispatch(setAppLoading(false));
    }
  }, [dispatch, selectedAirlines]);

  const selectAll = useCallback(() => {
    dispatch(setAppLoading(true));
    try {
      dispatch(setFlightSelectedAirlines(airlines.map((a) => a.code)));
    } finally {
      dispatch(setAppLoading(false));
    }
  }, [dispatch, airlines]);

  const handleReset = useCallback(() => {
    dispatch(setAppLoading(true));
    try {
      dispatch(setFlightSelectedAirlines(airlines.map((a) => a.code)));
      dispatch(setFlightPriceRange(priceMinMax));
      dispatch(setFlightDurationRange(durationMinMax));
    } finally {
      dispatch(setAppLoading(false));
    }
  }, [dispatch, airlines, priceMinMax, durationMinMax]);



  const onPriceChange = useDebouncedCallback((value: [number, number]) => {
    dispatch(setFlightPriceRange(value));
  }, 100);

  const onDurationChange = useDebouncedCallback((value: [number, number]) => {
    dispatch(setFlightDurationRange(value));
  }, 100);

  const isLoading = queryLoading || loadingFilter || allFlights.length === 0;

  useEffect(() => {
    if (allFlights.length > 0 && !queryLoading && !loadingFilter) {
      handleReset();
    }
  }, [allFlights.length, queryLoading, loadingFilter, handleReset]);

  return {
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
  };
};