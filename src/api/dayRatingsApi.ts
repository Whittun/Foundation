import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dayRatingsApi = createApi({
  reducerPath: 'dayRatingsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),

  tagTypes: ['YearRatings'],

  endpoints: (builder) => ({
    getYearRatings: builder.query({
      query: (year: number) => ({
        url: '/day-ratings',
        params: {
          year,
        },
      }),

      providesTags: ['YearRatings']
    }),
    setDayRating: builder.mutation({
      query: ({date, rating}: {date: string; rating: number}) => ({
        url: '/day-ratings',
        method: 'PATCH',
        body: {
          date,
          rating
        },
      }),

      invalidatesTags: ['YearRatings']
    }),
    deleteDayRating: builder.mutation({
      query: ({date}: {date: string}) => ({
        url: '/day-ratings',
        method: 'DELETE',
        body: {
          date
        },
      }),
      invalidatesTags: ['YearRatings']
    }),
  }),
})

export const { useGetYearRatingsQuery, useSetDayRatingMutation, useDeleteDayRatingMutation } = dayRatingsApi;