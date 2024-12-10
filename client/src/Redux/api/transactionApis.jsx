import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from './userApi';

export const transactionApis = createApi({
  reducerPath: 'transactionApis',
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/transactions/`,
  }),
  tagTypes: ['Transaction'],
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query: ({ ownerName, amount, transactionImage, transactionId }) => ({
        url: 'create',
        method: 'POST',
        body: { ownerName, amount, transactionImage, transactionId },
      }),
      invalidatesTags: ['Transaction'],
    }),
    getOwnerPayments: builder.query({
      query: ({ ownerId }) => ({
        url: `owner-payments?ownerId=${ownerId}`,
        method: 'GET',
      }),
      providesTags: ['Transaction'],
    }),
    verifyPayment: builder.mutation({
      query: ({ transactionId, ownerId }) => ({
        url: 'verify-payment',
        method: 'POST',
        body: { transactionId, ownerId },
      }),
      invalidatesTags: ['Transaction'],
    }),
    getAllTransactions: builder.query({
      query: () => ({
        url: 'all-transactions',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateTransactionMutation,
  useGetOwnerPaymentsQuery,
  useVerifyPaymentMutation,
  useGetAllTransactionsQuery,
} = transactionApis;
