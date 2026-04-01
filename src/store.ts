import { configureStore } from "@reduxjs/toolkit";
import { dayRatingsApi } from "./api/dayRatingsApi";

export const store = configureStore({
  reducer: {
    [dayRatingsApi.reducerPath]: dayRatingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dayRatingsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
