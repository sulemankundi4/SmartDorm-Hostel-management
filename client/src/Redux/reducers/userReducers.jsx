import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = userReducer.actions;
