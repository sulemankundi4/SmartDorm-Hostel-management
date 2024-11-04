import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  useGetHostelOwnersQuery,
  useGetOwnerCardDetailsQuery,
  useSendPaymentToOwnerMutation,
  useGetOwnerTotalPaymentQuery,
} from '../../../Redux/api/paymentMethodApis';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ManagePayments = () => {
  const { user } = useSelector((s) => s.userReducer);
  const [selectedOwner, setSelectedOwner] = useState('');
  const [amount, setAmount] = useState('');

  const { data: ownersData, isLoading: ownersLoading } =
    useGetHostelOwnersQuery({ id: user._id });

  const { data: ownerTotalPaymentData, refetch: refetchOwnerTotalPayment } =
    useGetOwnerTotalPaymentQuery(
      { ownerId: selectedOwner, id: user._id },
      { skip: !selectedOwner },
    );

  const {
    data: cardDetailsData,
    refetch: refetchCardDetails,
    isFetching: isFetchingCardDetails,
  } = useGetOwnerCardDetailsQuery(
    { ownerId: selectedOwner, id: user._id },
    { skip: !selectedOwner },
  );

  const [sendPaymentToOwner] = useSendPaymentToOwnerMutation({ id: user._id });

  useEffect(() => {
    if (selectedOwner) {
      refetchCardDetails();
      refetchOwnerTotalPayment();
    }
  }, [selectedOwner, refetchCardDetails]);

  useEffect(() => {
    if (
      selectedOwner &&
      !isFetchingCardDetails &&
      !cardDetailsData?.data?.cardNumber
    ) {
      toast.error('The owner has not added payment methods yet');
    }
  }, [selectedOwner, isFetchingCardDetails, cardDetailsData]);

  const handleOwnerChange = (e) => {
    setSelectedOwner(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendPaymentToOwner({
        ownerId: selectedOwner,
        amount,
      });
      if (response.error) {
        return toast.error(response.error.data.message);
      }
      toast.success('Payment sent successfully');
      setAmount('');
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  return (
    <DefaultLayout>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full dark:bg-boxdark">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Manage Payments
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Select Hostel Owner
              </label>
              <select
                value={selectedOwner}
                onChange={handleOwnerChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                required
              >
                <option value="">Select Owner</option>
                {ownersData?.data?.map((owner) => (
                  <option key={owner._id} value={owner._id}>
                    {owner.Name} ({owner.Email})
                  </option>
                ))}
              </select>
            </div>
            {isFetchingCardDetails ? (
              <p>Loading card details...</p>
            ) : cardDetailsData?.data?.cardNumber ? (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardDetailsData?.data?.cardNumber}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  readOnly
                />
              </div>
            ) : (
              selectedOwner !== '' && (
                <p className="text-red-500">
                  No card number found for the selected owner.
                </p>
              )
            )}
            {ownerTotalPaymentData && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Total Payment To be Sent
                </label>
                <input
                  type="text"
                  value={ownerTotalPaymentData?.data?.totalPayment + ' PKR'}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  readOnly
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Payment
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ManagePayments;
