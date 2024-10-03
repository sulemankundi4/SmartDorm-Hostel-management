import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
export const server = import.meta.env.VITE_SERVER_URL;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/users/` }),
  endpoints: (builder) => ({
    logIn: builder.mutation({
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
    signUp: builder.mutation({
      query: ({ body, Role }) => ({
        url: 'signup',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        credentials: 'include',
        body: { ...body, Role },
      }),
    }),
    resendEmail: builder.mutation({
      query: (email) => ({
        url: `resendEmail/${email}`,
        method: 'POST',
      }),
    }),
    getAllUsers: builder.query({
      query: (id) => `allUsers?id=${id}`,
      method: 'GET',
    }),
    googleLogin: builder.mutation({
      query: ({ Email, Name, uid, isOwner }) => ({
        url: 'googleAuth',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        credentials: 'include',
        body: { Email, Name, uid, isOwner },
      }),
    }),
  }),
});

export const getLoggedInUser = async (id, userType) => {
  try {
    let res;

    if (userType === 'user') {
      const { data } = await axios.get(`${server}/api/v1/users/${id}`);
      res = data;
    } else {
      const { data } = await axios.get(`${server}/api/v1/students/${id}`);
      res = data;
    }

    console.log(res);
    return res.payLoad.user;
  } catch (e) {
    throw new Error(e);
  }
};

// AT LEAST FOR NOW I DONT NEED THIS FUNCTION
// export const getUserByUid = async (uid) => {
//   try {
//     const { data } = await axios.get(`${server}/api/v1/users/uid/${uid}`);
//     console.log(data);
//     return data;
//   } catch (e) {
//     throw new Error(e);
//   }
// };
export const {
  useSignUpMutation,
  useLogInMutation,
  useResendEmailMutation,
  useGoogleLoginMutation,
  useGetAllUsersQuery,
} = userApi;
