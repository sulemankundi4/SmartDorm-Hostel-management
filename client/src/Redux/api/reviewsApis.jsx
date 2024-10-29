import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from './userApi';

export const reviewsAPIs = createApi({
  reducerPath: 'reviewsAPIs',
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/reviews/`,
  }),
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ body }) => ({
        url: 'add',
        method: 'POST',
        body,
      }),
    }),
    getAllReviewsOfHostel: builder.query({
      query: ({ hostelId }) => ({
        url: `get-reviews?hostelId=${hostelId}`,
        method: 'GET',
      }),
    }),
    hasUserReviewedHostel: builder.query({
      query: ({ userId, hostelId }) => ({
        url: `has-reviewed?userId=${userId}&hostelId=${hostelId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetAllReviewsOfHostelQuery,
  useAddReviewMutation,
  useHasUserReviewedHostelQuery,
} = reviewsAPIs;
