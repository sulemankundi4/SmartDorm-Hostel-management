import React, { useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useGetAllTransactionsQuery } from '../../../Redux/api/transactionApis';
import toast from 'react-hot-toast';

const AllTransactions = () => {
  const {
    data: transactionsData,
    isLoading,
    error,
  } = useGetAllTransactionsQuery();

  useEffect(() => {
    if (error) {
      toast.error('An error occurred while fetching transactions');
    }
  }, [error]);

  return (
    <DefaultLayout>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full dark:bg-boxdark">
          <h2 className="text-2xl font-bold mb-6 text-center">
            All Transactions
          </h2>
          {isLoading ? (
            <p>Loading transactions...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-boxdark">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Owner Name</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                    <th className="py-2 px-4 border-b">Transaction ID</th>
                    <th className="py-2 px-4 border-b">Transaction Image</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionsData?.data?.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="py-2 px-4 border-b">
                        {transaction.ownerName.Name}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {transaction.amount}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {transaction.transactionId}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <a
                          href={transaction.transactionImage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={transaction.transactionImage}
                            alt="Transaction"
                            className="w-20 h-20 object-cover"
                          />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AllTransactions;
