import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducers';
import { userApi } from './api/userApi';
import { hostelsApis } from './api/hostelApis';
import { ticketApis } from './api/ticketApis';
import { studentApis } from './api/studentApis';
import { paymentApis } from './api/paymentApis';
import { singleRoomBookingsApis } from './api/singleRoomBookingsApis';
import { reviewsAPIs } from './api/reviewsApis';
import { paymentMethodApis } from './api/paymentMethodApis';
import { transactionApis } from './api/transactionApis';
export const store = configureStore({
  reducer: {
    [userReducer.name]: userReducer.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [hostelsApis.reducerPath]: hostelsApis.reducer,
    [ticketApis.reducerPath]: ticketApis.reducer,
    [studentApis.reducerPath]: studentApis.reducer,
    [paymentApis.reducerPath]: paymentApis.reducer,
    [singleRoomBookingsApis.reducerPath]: singleRoomBookingsApis.reducer,
    [reviewsAPIs.reducerPath]: reviewsAPIs.reducer,
    [paymentMethodApis.reducerPath]: paymentMethodApis.reducer,
    [transactionApis.reducerPath]: transactionApis.reducer,
  },
  middleware: (mid) => [
    ...mid(),
    userApi.middleware,
    hostelsApis.middleware,
    ticketApis.middleware,
    studentApis.middleware,
    paymentApis.middleware,
    singleRoomBookingsApis.middleware,
    reviewsAPIs.middleware,
    paymentMethodApis.middleware,
    transactionApis.middleware,
  ],
});
