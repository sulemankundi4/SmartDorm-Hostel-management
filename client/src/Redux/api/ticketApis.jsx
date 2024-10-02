import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const server = import.meta.env.VITE_SERVER_URL;

export const ticketApis = createApi({
  reducerPath: 'ticketsApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/tickets/` }),
  tagTypes: ['Tickets'],
  endpoints: (builder) => ({
    getAllTickets: builder.query({
      query: () => ({
        url: 'all',
        method: 'GET',
      }),
      providesTags: ['Tickets'],
    }),
    createTicket: builder.mutation({
      query: ({ data }) => ({
        url: 'create-ticket',
        method: 'POST',
        body: data,
      }),
    }),
    getTicketById: builder.query({
      query: (id) => ({
        url: `/get-ticket/${id}`,
        method: 'GET',
      }),
      providesTags: ['Tickets'],
    }),
    resolveTicket: builder.mutation({
      query: ({ id }) => ({
        url: `resolve-ticket/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Tickets'],
    }),
  }),
});

export const {
  useGetAllTicketsQuery,
  useResolveTicketMutation,
  useGetTicketByIdQuery,
  useCreateTicketMutation,
} = ticketApis;
