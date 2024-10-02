import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducers';
import { userApi } from './api/userApi';
import { hostelsApis } from './api/hostelApis';
import { ticketApis } from './api/ticketApis';

export const store = configureStore({
  reducer: {
    [userReducer.name]: userReducer.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [hostelsApis.reducerPath]: hostelsApis.reducer,
    [ticketApis.reducerPath]: ticketApis.reducer,
  },
  middleware: (mid) => [
    ...mid(),
    userApi.middleware,
    hostelsApis.middleware,
    ticketApis.middleware,
  ],
});
