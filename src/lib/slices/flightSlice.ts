import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { SortFlightOption } from '@/lib/types';
import { FlightFiltersState, Flight } from '../types';

interface FlightState extends FlightFiltersState {
  flights: Flight[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: FlightState = {
  flights: null,
  loading: false,
  error: null,
  selectedAirlines: [],
  priceRange: [0, 1000000],
  durationRange: [0, 1440],
  sortOption: 'recommendation',
};



const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    setFlights: (state, action: PayloadAction<Flight[]>) => {
      state.flights = action.payload;
      state.loading = false;
      state.error = null;
    },
    setFlightLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFlightError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFlightSelectedAirlines: (state, action: PayloadAction<string[]>) => {
      state.selectedAirlines = action.payload;
    },
    setFlightPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setFlightDurationRange: (state, action: PayloadAction<[number, number]>) => {
      state.durationRange = action.payload;
    },
    setSortFlightOption: (state, action: PayloadAction<SortFlightOption>) => {
      state.sortOption = action.payload;
    },
    resetFlightFilters: (state) => {
      state.selectedAirlines = initialState.selectedAirlines;
      state.priceRange = initialState.priceRange;
      state.durationRange = initialState.durationRange;
      state.sortOption = initialState.sortOption;
    },
    resetAllFlightState: (state) => {
      Object.assign(state, initialState);
    },
    purgeAllFlightState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setFlights, setFlightLoading, setFlightError, setFlightSelectedAirlines, setFlightPriceRange, setFlightDurationRange, setSortFlightOption, resetFlightFilters, resetAllFlightState, purgeAllFlightState } = flightSlice.actions;
export default flightSlice.reducer;