import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import {
  useGetHostelOwnersQuery,
  useGetOwnerCardDetailsQuery,
  useGetOwnerTotalPaymentQuery,
} from '../../../Redux/api/paymentMethodApis';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useCreateTransactionMutation } from '../../../Redux/api/transactionApis';
import { useNavigate } from 'react-router-dom';
import alerts from './../../../utils/alerts';
import MediaManagment from './../../../utils/mediaManagement';
import { getDownloadURL } from 'firebase/storage';

const ManagePayments = () => {
  const { user } = useSelector((s) => s.userReducer);
  const navigate = useNavigate();
  const [selectedOwner, setSelectedOwner] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const [createTransaction] = useCreateTransactionMutation();

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
      !cardDetailsData?.data?.length
    ) {
      toast.error('The owner has not added payment methods yet');
    }
  }, [selectedOwner, isFetchingCardDetails, cardDetailsData]);

  const handleOwnerChange = (e) => {
    setSelectedOwner(e.target.value);
    setSelectedPaymentMethod('');
  };

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const { basicAlert } = alerts();
  const { uploadFile } = MediaManagment();
  const allowedFileTypes = ['jpg', 'jpeg', 'png'];
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!transactionId) {
        setLoading(false);
        return toast.error('Please enter transaction ID');
      }
      if (!image) {
        setLoading(false);
        return toast.error('Please upload a transaction image');
      }
      const fileExtension = image.name.split('.').pop().toLowerCase();

      if (!allowedFileTypes.includes(fileExtension)) {
        setLoading(false);
        return basicAlert(
          'Validation Error',
          `We only accept jpg, jpeg and png files! Invalid file: ${image.name}`,
          'error',
        );
      }

      const snapshots = await uploadFile({
        files: [image], // Send the image as an array of one file
        setUploading: setLoading,
        setProgress,
      });

      const downloadURL = await getDownloadURL(snapshots[0].ref);

      const response = await createTransaction({
        ownerName: selectedOwner,
        amount: ownerTotalPaymentData?.data?.totalPayment,
        transactionId,
        transactionImage: downloadURL,
      });

      if (response.error) {
        setLoading(false);
        return toast.error(response.error.data.message);
      }

      navigate('/dashboard');
      toast.success('Payment sent successfully');
      setTransactionId('');
      setImage(null);
    } catch (e) {
      console.log(e);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
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
            {selectedOwner && (
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Select Payment Method
                </label>
                <select
                  value={selectedPaymentMethod}
                  onChange={handlePaymentMethodChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="Bank">Bank</option>
                  <option value="Easypaisa">Easypaisa</option>
                  <option value="JazzCash">JazzCash</option>
                </select>
              </div>
            )}
            {isFetchingCardDetails ? (
              <p>Loading payment details...</p>
            ) : selectedPaymentMethod === 'Bank' ? (
              cardDetailsData?.data?.filter(
                (method) => method.methodType === 'Bank',
              ).length > 0 ? (
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Bank Accounts
                  </label>
                  <ul className="list-disc pl-5">
                    {cardDetailsData?.data
                      ?.filter((method) => method.methodType === 'Bank')
                      .map((method) => (
                        <li key={method._id} className="mb-2">
                          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                            <p className="text-gray-700 dark:text-gray-300">
                              <strong>Account Number:</strong>{' '}
                              {method.cardNumber}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              <strong>Bank Name:</strong> {method.bankName}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              <strong>Account Holder:</strong> {method.userName}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              ) : (
                <p className="text-red-500">
                  No bank account found for the selected owner.
                </p>
              )
            ) : selectedPaymentMethod === 'Easypaisa' ? (
              cardDetailsData?.data?.filter(
                (method) => method.methodType === 'Easypaisa',
              ).length > 0 ? (
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Easypaisa Accounts
                  </label>
                  <ul className="list-disc pl-5">
                    {cardDetailsData?.data
                      ?.filter((method) => method.methodType === 'Easypaisa')
                      .map((method) => (
                        <li key={method._id} className="mb-2">
                          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                            <p className="text-gray-700 dark:text-gray-300">
                              <strong>Phone Number:</strong>{' '}
                              {method.phoneNumber}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              <strong>Account Holder:</strong> {method.userName}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              ) : (
                <p className="text-red-500">
                  No Easypaisa account found for the selected owner.
                </p>
              )
            ) : selectedPaymentMethod === 'JazzCash' ? (
              cardDetailsData?.data?.filter(
                (method) => method.methodType === 'JazzCash',
              ).length > 0 ? (
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    JazzCash Accounts
                  </label>
                  <ul className="list-disc pl-5">
                    {cardDetailsData?.data
                      ?.filter((method) => method.methodType === 'JazzCash')
                      .map((method) => (
                        <li key={method._id} className="mb-2">
                          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                            <p className="text-gray-700 dark:text-gray-300">
                              <strong>Phone Number:</strong>{' '}
                              {method.phoneNumber}
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              <strong>Account Holder:</strong> {method.userName}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              ) : (
                <p className="text-red-500">
                  No JazzCash account found for the selected owner.
                </p>
              )
            ) : null}
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

            {ownerTotalPaymentData?.data?.totalPayment > 0 && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Transaction ID
                  </label>
                  <input
                    type="text"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Enter transaction ID"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Transaction Image
                  </label>
                  <input
                    type="file"
                    name="transactionImage"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              </>
            )}

            <label htmlFor=""></label>

            {ownerTotalPaymentData?.data?.totalPayment > 0 && (
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Send Payment'}
              </button>
            )}
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ManagePayments;
