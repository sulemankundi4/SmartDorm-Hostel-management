import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetListingDetailsQuery } from '../../../Redux/api/hostelApis';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Navbar from '../../components/navBar';
import Footer from '../../components/footer';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCross } from 'react-icons/fa6';
import {
  useCreatePaymentIntentMutation,
  useGetBookingDetailsMutation,
} from '../../../Redux/api/paymentApis';
import toast from 'react-hot-toast';

const BookSeaterRoom = () => {
  const { user } = useSelector((s) => s.userReducer);
  const { hostelId, seaterType, seaterNumber } = useParams();
  const { data, isLoading } = useGetListingDetailsQuery({
    listingId: hostelId,
  });
  const navigate = useNavigate();
  const hostelData = data?.payLoad;
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const [createPaymentIntentApi] = useCreatePaymentIntentMutation();
  const [getBookingDetails] = useGetBookingDetailsMutation();

  const filterSeaterRoom = hostelData.SeaterRooms.filter(
    (room) => room.seaterType === parseInt(seaterType),
  );

  const seaterRoom = filterSeaterRoom.find(
    (room) => room.count === parseInt(seaterNumber),
  );

  const getStatusIcon = (isAvailable) => {
    return isAvailable ? (
      <FaCheckCircle className="text-green-500 text-2xl" />
    ) : (
      <FaTimesCircle className="text-red-500 text-2xl" />
    );
  };

  const handleBookNowClick = (room) => {
    if (!user) {
      return navigate('/signup');
    }
    setSelectedRoom(room);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowBookingDetails = async (roomNumber) => {
    try {
      const { data } = await getBookingDetails({ roomNumber });
      if (data.success) {
        setBookingDetails(data.booking);
        setShowBookingDetails(true);
      } else {
        toast.error('Failed to fetch booking details');
      }
    } catch (error) {
      toast.error('An error occurred while fetching booking details');
      console.log(error);
    }
  };

  const handleCloseBookingDetails = () => {
    setShowBookingDetails(false);
  };

  const createPaymentIntent = async () => {
    try {
      setSubmitting(true);
      const { data } = await createPaymentIntentApi({
        amount: hostelData.HostelRent,
      });

      if (data.success) {
        setSubmitting(false);

        return navigate('/pay/multiseater', {
          state: {
            clientSecret: data.clientSecret,
            hostelId: hostelData._id,
            amount: hostelData.HostelRent,
            ownerId: hostelData.ListingOwner._id,
            roomNumber: selectedRoom,
            seaterType: seaterRoom.seaterType,
            count: seaterRoom.count,
          },
        });
      }
      setSubmitting(false);

      toast.error(data.message);
    } catch (error) {
      toast.error('Something went wrong during Booking');
      setSubmitting(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          {seaterType}-Seater Room
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {seaterRoom.rooms.map((room, roomIndex) => (
            <div
              key={roomIndex}
              className="bg-white shadow-lg rounded-lg p-6 text-center transform transition duration-500 hover:scale-105"
            >
              <h3 className="text-2xl text-black font-semibold mb-4">
                Room {roomIndex + 1}
              </h3>
              <p className="text-gray-600 mb-4">
                Room Number: {room.roomNumber}
              </p>
              <div className="flex justify-center items-center mb-4">
                {getStatusIcon(room.isAvailable)}
                <span className="ml-2 text-lg">
                  {room.isAvailable ? 'Available' : 'Booked'}
                </span>
              </div>
              <button
                className={`py-2 px-4 rounded-lg transition duration-300 ${
                  room.isAvailable
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'hidden'
                }`}
                onClick={() => handleBookNowClick(room.roomNumber)}
                disabled={!room.isAvailable}
              >
                {room.isAvailable ? 'Book Now' : 'Unavailable'}
              </button>
              {!room.isAvailable && (
                <button
                  className="bg-blue-500 text-white py-2 px-2 rounded-lg hover:bg-blue-600 transition duration-300 mt-2"
                  onClick={() => handleShowBookingDetails(room.roomNumber)}
                >
                  Booking Details
                </button>
              )}
            </div>
          ))}
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-600 ease-in-out">
              <div className="fixed inset-0 bg-black-2 bg-opacity-75 transition-opacity duration-300 ease-in-out"></div>
              <div className="bg-white rounded-lg p-8 z-10 w-3/4 md:w-1/2 lg:w-1/3 relative transition-transform duration-300 ease-in-out transform scale-95">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={handleCloseModal}
                >
                  <FaCross />
                </button>
                <h2 className="text-2xl text-black font-bold mb-4">
                  Booking Confirmation
                </h2>
                <p className="mb-4">
                  You are about to book a single room for
                  {` ` + hostelData.HostelRent} PKR per month.
                </p>

                {submitting ? (
                  <button
                    disabled=""
                    type="button"
                    className="bg-red-500 items-center text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 mr-2"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-2 w-5 h-5 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      ></path>
                    </svg>
                    Processing...
                  </button>
                ) : (
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 mr-2"
                    onClick={createPaymentIntent}
                  >
                    Proceed To Check out
                  </button>
                )}

                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {showBookingDetails && (
            <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-600 ease-in-out">
              <div className="fixed inset-0 bg-black-2 bg-opacity-75 transition-opacity duration-300 ease-in-out"></div>
              <div className="bg-white rounded-lg p-8 z-10 w-3/4 md:w-1/2 lg:w-1/3 relative transition-transform duration-300 ease-in-out transform scale-95">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={handleCloseBookingDetails}
                >
                  <FaCross />
                </button>
                <h2 className="text-2xl text-black font-bold mb-4">
                  Booking Details
                </h2>
                {bookingDetails && (
                  <div>
                    <p className="mb-4">
                      <span className="font-bold">Student Name:</span>{' '}
                      {bookingDetails.StudentName.Name}
                    </p>
                    <p className="mb-4">
                      <span className="font-bold">Email:</span>{' '}
                      {bookingDetails.StudentName.Email}
                    </p>
                    <p className="mb-4">
                      <span className="font-bold">University:</span>{' '}
                      {bookingDetails.StudentName.University}
                    </p>
                    <p className="mb-4">
                      <span className="font-bold">Check-In Date:</span>{' '}
                      {new Date(
                        bookingDetails.CheckInDate,
                      ).toLocaleDateString()}
                    </p>
                    <p className="mb-4">
                      <span className="font-bold">Check-Out Date:</span>{' '}
                      {new Date(
                        bookingDetails.CheckOutDate,
                      ).toLocaleDateString()}
                    </p>
                    <p className="mb-4">
                      <span className="font-bold">Amount:</span>{' '}
                      {bookingDetails.Amount} PKR
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookSeaterRoom;
