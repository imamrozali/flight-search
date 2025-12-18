import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { AppState } from '../types';

const initialState: AppState = {
  loading: false,
  content: null,
  loadingApp: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAppContent: (state, action: PayloadAction<unknown>) => {
      state.content = action.payload;
    },

    resetAllAppState: (state) => {
      Object.assign(state, initialState);
    },
    purgeAllAppState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setAppLoading, setAppContent, resetAllAppState, purgeAllAppState } = appSlice.actions;
export default appSlice.reducer;