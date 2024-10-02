import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [months, setMonths] = useState(1);

  const handleMonthsChange = (event) => {
    setMonths(Number(event.target.value));
  };

  const monthlyRent = 500;
  const utilities = 100;
  const otherCharges = 50;
  const total = (monthlyRent + utilities + otherCharges) * months;

  return (
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
              <span className="font-semibold">${monthlyRent}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Utilities:</span>
              <span className="font-semibold">${utilities}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Other Charges:</span>
              <span className="font-semibold">${otherCharges}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black">Number of Months:</span>
              <select
                value={months}
                onChange={handleMonthsChange}
                className="ml-2 p-1 border rounded"
              >
                {[...Array(12).keys()].map((month) => (
                  <option key={month + 1} value={month + 1}>
                    {month + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="text-black font-bold">Total:</span>
              <span className="font-bold">${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
