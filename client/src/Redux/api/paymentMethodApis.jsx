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
  }),
});

export const { useAddPaymentMethodMutation, useGetPaymentMethodsQuery } =
  paymentMethodApis;
