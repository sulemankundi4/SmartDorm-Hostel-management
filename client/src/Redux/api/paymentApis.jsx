import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from './userApi';

export const paymentApis = createApi({
  reducerPath: 'paymentApis',
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/payments/`,
  }),
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: ({ amount }) => ({
        url: 'create-payment-intent',
        method: 'POST',
        body: { amount },
      }),
    }),
    createSingleBedBooking: builder.mutation({
      query: ({ body }) => ({
        url: 'create-new-single-booking',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useCreateSingleBedBookingMutation,
} = paymentApis;
