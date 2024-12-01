import React from 'react';
import DefaultLayout from './../../layout/DefaultLayout';
import { FaCreditCard, FaMobileAlt } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetPaymentMethodsQuery } from '../../../Redux/api/paymentMethodApis';

const PaymentMethod = () => {
  const { user } = useSelector((s) => s.userReducer);

  const { data: paymentMethodsData, isLoading } = useGetPaymentMethodsQuery({
    userId: user._id,
  });

  return (
    <DefaultLayout>
      <div className="flex flex-col w-full">
        <h3 className="text-2xl mb-2 font-bold text-black dark:text-white">
          Hi {`${user.Name}`}!
        </h3>
        <p className="text-black dark:text-white">
          This is where you can manage all your Payments.
        </p>
      </div>
      <div className="flex flex-col items-center md:flex-row md:space-x-4 w-full my-8">
        <div className="w-full md:w-1/2">
          <h6 className="text-xl font-bold text-black dark:text-white">
            My Payments
          </h6>
        </div>
        <div className="w-full md:w-1/2 flex justify-end">
          <Link
            to={'/manage/payment/methods/new'}
            className="inline-flex items-center px-3 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white cursor-pointer bg-red-500 hover:bg-red-600 transition-all duration-200"
          >
            <MdAdd size={24} />
            Add New Payment Method
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          paymentMethodsData?.data?.map((method) => (
            <div
              key={method._id}
              className="flex items-center bg-white dark:border-strokedark dark:bg-boxdark shadow-lg rounded-xl p-4"
            >
              <div className="flex-grow">
                <div className="flex items-center mb-2 mt-2">
                  {method.methodType === 'Bank' ? (
                    <FaCreditCard
                      size={26}
                      className="mr-2 text-black dark:text-white"
                    />
                  ) : (
                    <FaMobileAlt
                      size={26}
                      className="mr-2 text-black dark:text-white"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-bold text-black dark:text-white">
                      {method.methodType}
                    </span>
                    {method.methodType === 'Bank' ? (
                      <>
                        <span className="text-black dark:text-white">
                          Account number ending in {method.cardNumber.slice(-4)}
                        </span>
                        <span className="text-black dark:text-white">
                          Bank Name: {method.bankName}
                        </span>
                        <span className="text-black dark:text-white">
                          Account Holder: {method.userName}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-black dark:text-white">
                          Phone Number: {method.phoneNumber}
                        </span>
                        <span className="text-black dark:text-white">
                          Account Holder: {method.userName}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </DefaultLayout>
  );
};

export default PaymentMethod;
