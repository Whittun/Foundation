import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CreateHabitLevelArgs,
  Habit,
  HabitLevel,
  UpdateHabitLevelArgs,
} from '../types/habitsTypes';

export const HabitsApi = createApi({
  reducerPath: 'habitsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/habits',
  }),

  endpoints: (builder) => ({
    getAllHabits: builder.query<Habit[], void>({
      query: () => ({
        url: '',
      }),
    }),
    updateHabit: builder.mutation<Habit, { habitId: number; name: string }>({
      query: ({ habitId, name }) => ({
        url: `/${habitId}`,
        method: 'PATCH',
        body: {
          name,
        },
      }),
    }),
    createHabit: builder.mutation<Habit, { name: string }>({
      query: ({ name }) => ({
        url: ``,
        method: 'POST',
        body: {
          name,
        },
      }),
    }),
    deleteHabit: builder.mutation<{ deleted: boolean }, { habitId: number }>({
      query: ({ habitId }) => ({
        url: `/${habitId}`,
        method: 'DELETE',
      }),
    }),
    getHabitLevelsByHabit: builder.query<HabitLevel[], { habitId: number }>({
      query: ({ habitId }) => ({
        url: `/${habitId}/levels`,
      }),
    }),
    updateHabitLevel: builder.mutation<HabitLevel, UpdateHabitLevelArgs>({
      query: ({ habitLevelId, ...body }) => ({
        url: `/levels/${habitLevelId}`,
        method: 'PATCH',
        body,
      }),
    }),
    createHabitLevel: builder.mutation<HabitLevel, CreateHabitLevelArgs>({
      query: ({ habitId, ...body }) => ({
        url: `/${habitId}/levels`,
        method: 'POST',
        body,
      }),
    }),

    deleteHabitLevel: builder.mutation<{ deleted: boolean }, { habitLevelId: number }>({
      query: ({ habitLevelId }) => ({
        url: `/levels/${habitLevelId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllHabitsQuery,
  useUpdateHabitMutation,
  useCreateHabitMutation,
  useDeleteHabitMutation,
  useGetHabitLevelsByHabitQuery,
  useUpdateHabitLevelMutation,
  useCreateHabitLevelMutation,
  useDeleteHabitLevelMutation,
} = HabitsApi;
