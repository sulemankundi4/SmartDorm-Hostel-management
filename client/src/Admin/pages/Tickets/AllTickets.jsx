import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useGetAllTicketsQuery } from '../../../Redux/api/ticketApis';
import toast from 'react-hot-toast';
import Loader from '../../common/Loader';
import { useSelector } from 'react-redux';
import { BsChevronRight } from 'react-icons/bs';
import { FaChevronRight, FaRegBuilding, FaUser } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';

const AllTickets = () => {
  const { user } = useSelector((s) => s.userReducer);

  const { data, isLoading, error } = useGetAllTicketsQuery();
  const allTickets = data?.data;

  if (error) {
    return toast.error('An error occurred while fetching your listings');
  }

  return (
    <div>
      <DefaultLayout>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-col items-center md:flex-row md:space-x-4 w-full my-8">
              <div className="w-full md:w-1/2">
                <h6 className="text-xl font-bold text-black dark:text-white">
                  ALL User Tickets
                </h6>
              </div>
            </div>
            {allTickets.length > 0
              ? allTickets.map((ticket, key) => {
                  return (
                    <div
                      key={key}
                      className={`flex mb-4 items-center bg-white dark:border-strokedark dark:bg-boxdark shadow-lg rounded-xl p-6  ${
                        key !== 0 && 'mb-4'
                      }`}
                    >
                      <div className="flex-grow">
                        <div className="flex items-center mb-4">
                          <FaUser
                            size={26}
                            className="mr-2 text-black dark:text-white"
                          />
                          <div className="flex items-center">
                            <a className="text-lg font-semibold text-black underline dark:text-white mr-2">
                              {ticket.userName}
                            </a>
                            <span
                              className={`text-white rounded-full px-2 py-1 text-xs  ${
                                ticket.status === 'pending'
                                  ? 'bg-red-500'
                                  : 'bg-green-600'
                              }   `}
                            >
                              {ticket.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center mb-4">
                          <MdEmail
                            size={26}
                            className="mr-2 text-black dark:text-white"
                          />

                          <p className="text-black dark:text-white">
                            {ticket.userEmail}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 items-center">
                        <Link
                          to={`/ticket-details/${ticket._id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
                        >
                          See Ticket
                          <BsChevronRight size={18} />
                        </Link>
                      </div>
                    </div>
                  );
                })
              : null}
          </>
        )}
      </DefaultLayout>
    </div>
  );
};

export default AllTickets;
