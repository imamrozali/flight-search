'use client';

import { QueryProvider } from './query-provider';
import { ReduxProvider } from './redux-provider';
import { ThemeProvider } from './theme-provider';
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}