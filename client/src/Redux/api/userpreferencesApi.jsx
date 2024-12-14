import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from './userApi';

export const userPreferencesApi = createApi({
  reducerPath: 'userPreferencesApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/preferences/` }),
  tagTypes: ['UserPreferences'],
  endpoints: (builder) => ({
    createUserPreferences: builder.mutation({
      query: (body) => ({
        url: 'new',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UserPreferences'],
    }),
    getUserPreferences: builder.query({
      query: (userId) => ({
        url: `preferences/${userId}`,
        method: 'GET',
      }),
      providesTags: ['UserPreferences'],
    }),
    updateUserPreferences: builder.mutation({
      query: ({ userId, body }) => ({
        url: `preferences/${userId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['UserPreferences'],
    }),
    matchUserPreferences: builder.query({
      query: (userId) => ({
        url: `match/${userId}`,
        method: 'GET',
      }),
      providesTags: ['UserPreferences'],
    }),
  }),
});

export const {
  useCreateUserPreferencesMutation,
  useGetUserPreferencesQuery,
  useUpdateUserPreferencesMutation,
  useMatchUserPreferencesQuery,
} = userPreferencesApi;
