import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaChevronRight } from 'react-icons/fa';
import { BsChevronRight } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Loader from '../../common/Loader';
import alerts from '../../../utils/alerts';
import {
  useGetOwnerPaymentsQuery,
  useVerifyPaymentMutation,
} from '../../../Redux/api/transactionApis';

const ManagePaymentsOwner = () => {
  const { user } = useSelector((s) => s.userReducer);
  const [verifyPayment] = useVerifyPaymentMutation();
  const { confirmAlert, basicAlert } = alerts();

  const { data, isLoading, error } = useGetOwnerPaymentsQuery({
    ownerId: user._id,
  });

  const paymentData = data?.data;

  if (error) {
    return toast.error('An error occurred while fetching your payments');
  }

  const verifyHandler = async (transactionId) => {
    const result = await confirmAlert(
      'Are you sure want to verify this payment?',
    );
    if (result.isConfirmed) {
      const res = await verifyPayment({
        ownerId: user._id,
        transactionId,
      });

      if (res.data) {
        basicAlert('Verified!', 'This payment has been verified.', 'success');
      } else if (res.error) {
        basicAlert('Failed!', res.error.data.message, 'error');
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      basicAlert(
        'Cancelled',
        'The payment verification was cancelled.',
        'error',
      );
    }
  };

  console.log(paymentData);

  return (
    <DefaultLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col w-full">
            <h3 className="text-2xl mb-2 font-bold text-black dark:text-white">
              Hi {`${user.Name}`}!
            </h3>
            <p className="text-black dark:text-white">
              This is where you can manage all your payments.
            </p>
          </div>
          <div className="flex flex-col items-center md:flex-row md:space-x-4 w-full my-8">
            <div className="w-full md:w-1/2">
              <h6 className="text-xl font-bold text-black dark:text-white">
                ALL Payments
              </h6>
            </div>
          </div>
          {paymentData?.length > 0
            ? paymentData.map((payment, key) => {
                return (
                  <div
                    key={key}
                    className={`flex mb-4 items-center bg-white dark:border-strokedark dark:bg-boxdark shadow-lg rounded-xl p-6  ${
                      key !== 0 && 'mb-4'
                    }`}
                  >
                    <div className="flex-grow">
                      <div className="flex items-center mb-4">
                        <div className="flex items-center">
                          <a
                            href={payment.transactionImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-black underline dark:text-white mr-2"
                          >
                            {payment.transactionId}
                          </a>
                          <span
                            className={`text-white rounded-full px-2 py-1 text-xs  ${
                              payment.isRecieved ? 'bg-green-600' : 'bg-red-500'
                            }   `}
                          >
                            {payment.isRecieved ? 'Received' : 'Pending'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <p className="text-black dark:text-white">
                          Amount: {payment.amount} PKR
                        </p>
                      </div>
                      <div className="flex items-center mb-4">
                        <a
                          href={payment.transactionImage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={payment.transactionImage}
                            alt="Transaction"
                            className="w-32 h-32 object-cover rounded-lg shadow-md"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 items-center">
                      {!payment.isRecieved && (
                        <button
                          onClick={() => verifyHandler(payment.transactionId)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
                        >
                          Verify Payment
                          <FaChevronRight size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            : null}
        </>
      )}
    </DefaultLayout>
  );
};

export default ManagePaymentsOwner;
