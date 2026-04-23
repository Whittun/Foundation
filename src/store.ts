import { configureStore } from '@reduxjs/toolkit';
import { dayRatingsApi } from './api/dayRatingsApi';
import { habitsApi } from './api/habitsApi';

export const store = configureStore({
  reducer: {
    [dayRatingsApi.reducerPath]: dayRatingsApi.reducer,
    [habitsApi.reducerPath]: habitsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dayRatingsApi.middleware, habitsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
