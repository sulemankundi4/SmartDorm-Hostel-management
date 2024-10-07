import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateSingleBedBookingMutation } from '../../../../Redux/api/paymentApis';
import toast from 'react-hot-toast';
import alerts from '../../../../utils/alerts';

const CheckoutForm = ({ hostelId, amount, ownerId }) => {
  const { user } = useSelector((state) => state.userReducer);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [months, setMonths] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { confirmAlert, basicAlert } = alerts();

  const [singleRoomBooking] = useCreateSingleBedBookingMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await confirmAlert('Are you sure want to Book this Hostel?');

    const bookingData = {
      CheckInDate: new Date(new Date().setDate(new Date().getDate() + 1)),

      Amount: amount,
      HostelOwnerName: ownerId,
      HostelName: hostelId,
      StudentName: user?._id,
    };

    if (result.isConfirmed) {
      setIsProcessing(true);

      const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.origin },
        redirect: 'if_required',
      });

      if (error) {
        setIsProcessing(false);
        return toast.error(error.message || 'An error occurred');
      }

      if (paymentIntent.status === 'succeeded') {
        const { data } = await singleRoomBooking({ body: bookingData });

        if (data.success) {
          basicAlert(
            'Payment Success!',
            'The room has been booked you will be notified once the owner verify info. Check status at your profile',
            'success',
          );
        } else {
          return basicAlert('Failed!', data.message, 'error');
        }
        setIsProcessing(false);

        navigate('/');
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      basicAlert(
        'Cancelled',
        'The Hostel Booking has been cancelled.',
        'error',
      );
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
        <div className="flex flex-col md:flex-row w-full max-w-4xl">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg transform transition-all duration-500 hover:scale-105 flex-1">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">
              Checkout
            </h2>
            <form className="space-y-6">
              <PaymentElement className="mb-4" />
              <button
                type="submit"
                disabled={isProcessing}
                onClick={submitHandler}
                className={`w-full py-3 px-4 bg-red-500 text-white font-semibold rounded-md shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </form>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg transform transition-all duration-500 hover:scale-105 flex-1 ml-0 md:ml-6 mt-6 md:mt-0">
            <h2 className="text-2xl font-bold mb-6 text-center text-black">
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-black">Monthly Rent:</span>
                <span className="font-semibold">{amount} PKR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">Utilities:</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">Other Charges:</span>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">Number of Months:</span>
                <span className="font-semibold">1</span>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span className="text-black font-bold">Total:</span>
                <span className="font-bold">{amount} PKR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
