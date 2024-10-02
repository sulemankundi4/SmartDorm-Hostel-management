import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from './userApi';

export const hostelsApis = createApi({
  reducerPath: 'hostelsApis',
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/listings/` }),
  tagTypes: ['hostels'],
  endpoints: (builder) => ({
    addNewListing: builder.mutation({
      query: ({ body }) => ({
        url: 'addNew',
        method: 'POST',
        body,
      }),
    }),
    updateListing: builder.mutation({
      query: ({ id, body }) => ({
        url: `updateListing/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['hostels'],
    }),
    ownerListing: builder.query({
      query: ({ id }) => ({
        url: `ownerListing?id=${id}`,
        method: 'GET',
      }),
      providesTags: ['hostels'],
    }),
    getAllListings: builder.query({
      query: ({ id }) => ({
        url: `allListings?id=${id}`,
        method: 'GET',
      }),
      providesTags: ['hostels'],
    }),
    verifyListing: builder.mutation({
      query: ({ id, listingId }) => ({
        url: `verifyListing?id=${id}`,
        method: 'POST',
        body: { listingId },
      }),
      invalidatesTags: ['hostels'],
    }),
    getSingleListing: builder.query({
      query: ({ id, listingId }) => ({
        url: `getListing?id=${id}&listingId=${listingId}`,
        method: 'GET',
      }),
      providesTags: ['hostels'],
    }),
    getListingDetails: builder.query({
      query: ({ listingId }) => ({
        url: `listingDetails?listingId=${listingId}`,
        method: 'GET',
      }),
      providesTags: ['hostels'],
    }),
    getAllVerifiedListings: builder.query({
      query: () => ({
        url: 'getAllVerifiedListings',
        method: 'GET',
      }),
    }),
    searchListingWithinRange: builder.mutation({
      query: ({ Lat, Lon, distance }) => ({
        url: `getListingsWithin`,
        method: 'POST',
        body: { Lat, Lon, distance },
      }),
    }),
    deleteListing: builder.mutation({
      query: ({ listingId }) => ({
        url: '/deleteListing',
        method: 'POST',
        body: { listingId },
      }),
      invalidatesTags: ['hostels'],
    }),
  }),
});

export const {
  useSearchListingWithinRangeMutation,
  useAddNewListingMutation,
  useGetSingleListingQuery,
  useGetListingDetailsQuery,
  useGetAllListingsQuery,
  useOwnerListingQuery,
  useVerifyListingMutation,
  useDeleteListingMutation,
  useUpdateListingMutation,
  useGetAllVerifiedListingsQuery,
} = hostelsApis;
