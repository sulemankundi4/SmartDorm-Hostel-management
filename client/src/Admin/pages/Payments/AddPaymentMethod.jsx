import React, { useState } from 'react';
import toast from 'react-hot-toast';
import DefaultLayout from './../../layout/DefaultLayout';
import { useAddPaymentMethodMutation } from '../../../Redux/api/paymentMethodApis';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddPaymentMethod = () => {
  const navigate = useNavigate();
  const [methodType, setMethodType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [addPaymentMethod] = useAddPaymentMethodMutation();
  const { user } = useSelector((s) => s.userReducer);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!methodType || !userName) {
        return toast.error('Please provide all required fields');
      }

      if (methodType === 'Bank' && (!cardNumber || !bankName)) {
        return toast.error('Please provide card number and bank name');
      }

      if (
        (methodType === 'Easypaisa' || methodType === 'JazzCash') &&
        !phoneNumber
      ) {
        return toast.error('Please provide phone number');
      }

      if (methodType === 'Bank' && cardNumber.length !== 13) {
        return toast.error('Card number must be 13 digits long');
      }

      if (
        (methodType === 'Easypaisa' || methodType === 'JazzCash') &&
        phoneNumber.length !== 11
      ) {
        return toast.error('Phone number must be 11 digits long');
      }

      if (response.error) {
        return toast.error(response.error.data.message);
      }
      const response = await addPaymentMethod({
        methodType,
        cardNumber,
        bankName,
        phoneNumber,
        userName,
        userId: user?._id,
      });

      toast.success('Payment method added successfully');
      navigate('/manage/payment/methods');
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full dark:bg-boxdark">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Add Payment Method
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Payment Method Type
              </label>
              <select
                value={methodType}
                onChange={(e) => setMethodType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
              >
                <option value="">Select Payment Method</option>
                <option value="Bank">Bank</option>
                <option value="Easypaisa">Easypaisa</option>
                <option value="JazzCash">JazzCash</option>
              </select>
            </div>
            {methodType === 'Bank' && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Account Number
                  </label>
                  <input
                    type="number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Enter Account number"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Enter bank name"
                    required
                  />
                </div>
              </>
            )}
            {(methodType === 'Easypaisa' || methodType === 'JazzCash') && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Name on Account
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                placeholder="Enter name on account"
                required
              />
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
  );
};

export default AddPaymentMethod;
