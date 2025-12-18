'use client';

import Dropdown from '@/components/ui/dropdown';
import { SortFlightOption } from '@/lib/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { setSortFlightOption } from '@/lib/slices/flightSlice';
import { sortFlightOption } from '@/lib/data/sort-options';

const FlightDropdown = () => {
  const dispatch = useDispatch();
  const sortOption = useSelector((state: RootState) => state.filters.sortOption);

  const handleChange = (value: SortFlightOption) => {
    dispatch(setSortFlightOption(value));
  };

  return (
    <Dropdown value={sortOption} onChange={handleChange} options={sortFlightOption} />
  );
};

export default FlightDropdown;