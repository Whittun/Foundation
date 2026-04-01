import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dayRatingsApi = createApi({
  reducerPath: 'dayRatingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  endpoints: (builder) => ({
    getYearRatings: builder.query({
      query: (year: number) => ({
        url: '/day-ratings',
        params: {
          year,
        },
      }),
    }),
  }),
}) 

export const { useGetYearRatingsQuery } = dayRatingsApi;