import React, { useState } from 'react';
import Navbar from '../../components/navBar';
import TopBar from '../../components/topBar';
import { useSelector } from 'react-redux';
import SideBar from './components/sideBar';
import Loader from '../../../Admin/common/Loader';
import { useGetBookingsQuery } from '../../../Redux/api/singleRoomBookingsApis';
import toast from 'react-hot-toast';

const StudentBookings = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { data, isLoading, isError } = useGetBookingsQuery({
    userId: user._id,
    isStudent: true,
  });

  const bookingData = data?.bookings;
  const multiSeaterBookingData = data?.multiSeaterBookings;

  if (isError) {
    return toast.error('An error occurred while fetching your bookings');
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <section className="relative w-[94%] mx-auto lg:pb-24 pb-16 md:mt-[84px] mt-[70px] bg-white dark:bg-gray-900">
        <div className="container relative md:mt-24 mt-16">
          <div className="md:flex">
            <SideBar />
            <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6">
              <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800">
                <div className="mt-6">
                  <h5 className="text-lg font-semibold mb-4 text-black dark:text-white">
                    Single Room Bookings
                  </h5>
                  {isLoading ? (
                    <Loader />
                  ) : bookingData?.length === 0 ? (
                    <div className="text-center text-xl font-bold text-red-500 dark:text-red-400">
                      No bookings found.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {bookingData?.map((booking) => (
                        <div
                          key={booking._id}
                          className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800"
                        >
                          <h4 className="text-lg font-bold text-black dark:text-white">
                            {booking.HostelName.HostelName}
                          </h4>
                          <p className="text-black dark:text-gray-300">
                            <span className="font-bold">Address:</span>{' '}
                            {booking.HostelName.HostelAddress}
                          </p>
                          <p className="text-black dark:text-gray-300">
                            <span className="font-bold">Booking Id:</span>{' '}
                            {booking._id}
                          </p>
                          <p className="text-black dark:text-gray-300">
                            <span className="font-bold">Hostel Owner:</span>{' '}
                            {booking.HostelOwnerName.Name} (
                            {booking.HostelOwnerName.Email})
                          </p>
                          <p className="text-black dark:text-gray-300">
                            <span className="font-bold">Check-In Date:</span>{' '}
                            {new Date(booking.CheckInDate).toLocaleDateString()}
                          </p>
                          <p className="text-black dark:text-gray-300">
                            <span className="font-bold">Check-Out Date:</span>{' '}
                            {new Date(
                              booking.CheckOutDate,
                            ).toLocaleDateString()}
                          </p>
                          <p
                            className={`mb-1 ${
                              booking.Status === 'confirmed'
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}
                          >
                            Status: {booking.Status}
                          </p>
                          <p className="text-black dark:text-gray-300 mb-4">
                            <span className="font-bold">Amount:</span>
                            {booking.Amount} PKR
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h5 className="text-lg font-semibold mb-4 text-black dark:text-white">
                    Multi-Seater Room Bookings
                  </h5>
                  {isLoading ? (
                    <Loader />
                  ) : multiSeaterBookingData?.length === 0 ? (
                    <div className="text-center text-xl font-bold text-red-500 dark:text-red-400">
                      No bookings found.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {multiSeaterBookingData?.map((booking) => (
                        <div
                          key={booking._id}
                          className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800"
                        >
                          <h4 className="text-lg font-bold text-black dark:text-white">
                            {booking.HostelName.HostelName}
                          </h4>
                          <p className="text-black dark:text-gray-300">
                            <span className="font-bold">Address:</span>{' '}
                            {booking.HostelName.HostelAddress}
                          </p>
                          <p className="text-black dark:text-gray-300">
                            <span className="font-bold">Booking Id:</span>{' '}
                            {booking._id}
                          </p>
                          <p className="text-black dark:text-gray-300">
                            <span className="font-bold">Hostel Owner:</span>{' '}
                            {booking.HostelOwnerName.Name} (
                            {booking.HostelOwnerName.Email})
                          </p>

                          <p className="text-black dark:text-gray-300">
                            <span className="font-bold">Seater Type:</span>{' '}
                            {booking.SeaterType} Seater
                          </p>
                          <p className="text-black dark:text-gray-300">
                            <span className="font-bold">Room Number:</span>{' '}
                            {booking.RoomNumber}
                          </p>
                          <p className="text-black dark:text-gray-300">
                            <span className="font-bold">Check-In Date:</span>{' '}
                            {new Date(booking.CheckInDate).toLocaleDateString()}
                          </p>
                          <p className="text-black dark:text-gray-300">
                            <span className="font-bold">Check-Out Date:</span>{' '}
                            {new Date(
                              booking.CheckOutDate,
                            ).toLocaleDateString()}
                          </p>
                          <p
                            className={`mb-1 ${
                              booking.Status === 'confirmed'
                                ? 'text-green-500'
                                : 'text-red-500'
                            }`}
                          >
                            Status: {booking.Status}
                          </p>
                          <p className="text-black dark:text-gray-300 mb-4">
                            <span className="font-bold">Amount:</span>
                            {booking.Amount} PKR
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentBookings;
