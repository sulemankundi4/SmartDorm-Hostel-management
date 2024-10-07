import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from './userApi';

export const singleRoomBookingsApis = createApi({
  reducerPath: 'singleRoomBookingsApis',
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/single-room-booking/`,
  }),
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: ({ userId, isStudent }) => ({
        url: `get-all-bookings?userId=${userId}&isStudent=${isStudent}`,
        method: 'GET',
      }),
      providesTags: ['SingleRoomBookings'],
    }),
    verifyBooking: builder.mutation({
      query: ({ bookingId }) => ({
        url: 'verify-single-room-booking',
        method: 'POST',
        body: { bookingId },
      }),
      invalidatesTags: ['SingleRoomBookings'],
    }),
    getCommunityStats: builder.query({
      query: ({ hostelId }) => ({
        url: `get-community-stats?hostelId=${hostelId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useVerifyBookingMutation,
  useGetCommunityStatsQuery,
} = singleRoomBookingsApis;
