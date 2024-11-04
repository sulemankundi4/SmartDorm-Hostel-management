import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from './userApi';

export const paymentMethodApis = createApi({
  reducerPath: 'paymentMethodApis',
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/payment-method/`,
  }),
  endpoints: (builder) => ({
    addPaymentMethod: builder.mutation({
      query: ({ cardNumber, cardType, userName, userId }) => ({
        url: 'add',
        method: 'POST',
        body: { cardNumber, cardType, userId, userName },
      }),
    }),
    getPaymentMethods: builder.query({
      query: ({ userId }) => ({
        url: `?userId=${userId}`,
        method: 'GET',
      }),
    }),
    getPaymentDetails: builder.query({
      query: ({ id }) => ({
        url: `details?id=${id}`,
        method: 'GET',
      }),
    }),
    getHostelOwners: builder.query({
      query: ({ id }) => ({
        url: `owners?id=${id}`,
        method: 'GET',
      }),
    }),
    getOwnerCardDetails: builder.query({
      query: ({ ownerId, id }) => ({
        url: `owner-card-details?id=${id}&ownerId=${ownerId}`,
        method: 'GET',
      }),
    }),
    sendPaymentToOwner: builder.mutation({
      query: ({ ownerId, amount, id }) => ({
        url: `send-payment?id=id${id}`,
        method: 'POST',
        body: { ownerId, amount },
      }),
    }),
    getOwnerTotalPayment: builder.query({
      query: ({ ownerId, id }) => ({
        url: `owner-total-payment?id=${id}&ownerId=${ownerId}`,
        method: 'GET',
      }),
    }),

    getOwnerExpectedPayment: builder.query({
      query: ({ ownerId }) => ({
        url: `owner-expected-payment?ownerId=${ownerId}`,
        method: 'GET',
      }),
    }),
  }),
});
export const {
  useAddPaymentMethodMutation,
  useGetPaymentMethodsQuery,
  useGetPaymentDetailsQuery,
  useGetHostelOwnersQuery,
  useGetOwnerCardDetailsQuery,
  useSendPaymentToOwnerMutation,
  useGetOwnerTotalPaymentQuery,
  useGetOwnerExpectedPaymentQuery,
} = paymentMethodApis;
