import { SortFlightOption } from "../types";

export const sortFlightOption: { value: SortFlightOption; label: string }[] = [
  { value: 'recommendation', label: 'Best Recommendation' },
  { value: 'price', label: 'Lowest Price' },
  { value: 'duration', label: 'Shortest Duration' },
];