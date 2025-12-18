 import { configureStore } from '@reduxjs/toolkit';
  import { persistStore, persistReducer } from 'redux-persist';
  import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
  import filightReducer from './slices/flightSlice';
  import appReducer from './slices/appSlice';

const sessionStorage = createWebStorage('session');

const flightPersistConfig = {
  key: 'flight',
  storage: sessionStorage,
};

const appPersistConfig = {
  key: 'app',
  storage: sessionStorage,
};

export const store = configureStore({
  reducer: {
    filters: persistReducer(flightPersistConfig, filightReducer),
    app: persistReducer(appPersistConfig, appReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

