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
    checkExistingBookings: builder.mutation({
      query: ({ StudentName, CheckInDate, CheckOutDate }) => ({
        url: 'check-existing-booking',
        method: 'POST',
        body: { StudentName, CheckInDate, CheckOutDate },
      }),
      invalidatesTags: ['SingleRoomBookings'],
    }),
    getCommunityStats: builder.query({
      query: ({ hostelId }) => ({
        url: `get-community-stats?hostelId=${hostelId}`,
        method: 'GET',
      }),
    }),
    getAllBookings: builder.query({
      query: ({ id }) => ({
        url: `all-bookings?id=${id}`,
        method: 'GET',
      }),
      providesTags: ['SingleRoomBookings'],
    }),
    getAllMultiseaterListings: builder.query({
      query: ({ id }) => ({
        url: `all-multiseater-bookings?id=${id}`,
        method: 'GET',
      }),
      providesTags: ['SingleRoomBookings'],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useVerifyBookingMutation,
  useGetCommunityStatsQuery,
  useCheckExistingBookingsMutation,
  useGetAllBookingsQuery,
  useGetAllMultiseaterListingsQuery,
} = singleRoomBookingsApis;
