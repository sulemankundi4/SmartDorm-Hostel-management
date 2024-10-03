import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
export const server = import.meta.env.VITE_SERVER_URL;

export const studentApis = createApi({
  reducerPath: 'studentApis',
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/students/` }),
  endpoints: (builder) => ({
    studentSignup: builder.mutation({
      query: ({ body }) => ({
        url: 'signup-student',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        credentials: 'include',
        body,
      }),
    }),
    studentLogIn: builder.mutation({
      query: ({ body }) => ({
        url: 'login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        credentials: 'include',
        body,
      }),
    }),
  }),
});

export const { useStudentSignupMutation, useStudentLogInMutation } =
  studentApis;
