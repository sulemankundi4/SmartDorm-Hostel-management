import React, { useState } from 'react';
import toast from 'react-hot-toast';
// import { useAddPaymentMethodMutation } from '../../Redux/api/paymentApis';
import DefaultLayout from './../../layout/DefaultLayout';
const AddPaymentMethod = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');
  const [userName, setUserName] = useState('');
  // const [addPaymentMethod] = useAddPaymentMethodMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await addPaymentMethod({
    //     cardNumber,
    //     expiryDate,
    //     cvv,
    //     cardType,
    //     userName,
    //   });
    //   if (response.error) {
    //     return toast.error(response.error.data.message);
    //   }
    //   toast.success('Payment method added successfully');
    //   setCardNumber('');
    //   setExpiryDate('');
    //   setCvv('');
    //   setCardType('');
    //   setUserName('');
    // } catch (e) {
    //   toast.error('Something went wrong');
    // }
  };

  return (
    <>
      <DefaultLayout>
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full ">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Add Payment Method
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Card Type
                </label>
                <select
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Card Type</option>
                  <option value="Visa">Visa</option>
                  <option value="MasterCard">MasterCard</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Add Payment Method
              </button>
            </form>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default AddPaymentMethod;
