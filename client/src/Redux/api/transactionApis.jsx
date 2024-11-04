import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from './userApi';

export const transactionApis = createApi({
  reducerPath: 'transactionApis',
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/transactions/`,
  }),
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query: ({ ownerName, amount, transactionId }) => ({
        url: 'create',
        method: 'POST',
        body: { ownerName, amount, transactionId },
      }),
    }),
    getOwnerPayments: builder.query({
      query: ({ ownerId }) => ({
        url: `owner-payments?ownerId=${ownerId}`,
        method: 'GET',
      }),
    }),
    verifyPayment: builder.mutation({
      query: ({ transactionId, ownerId }) => ({
        url: 'verify-payment',
        method: 'POST',
        body: { transactionId, ownerId },
      }),
    }),
  }),
});

export const {
  useCreateTransactionMutation,
  useGetOwnerPaymentsQuery,
  useVerifyPaymentMutation,
} = transactionApis;
