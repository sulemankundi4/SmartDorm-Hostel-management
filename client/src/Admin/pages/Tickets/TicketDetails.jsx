import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import alerts from '../../../utils/alerts';
import { useParams } from 'react-router-dom';
import {
  useGetTicketByIdQuery,
  useResolveTicketMutation,
} from '../../../Redux/api/ticketApis';
import Loader from '../../common/Loader';
import Swal from 'sweetalert2';
const TicketDetails = () => {
  const { ticketId } = useParams();

  const [resolveTicket] = useResolveTicketMutation();
  const { data, isLoading } = useGetTicketByIdQuery(ticketId);
  const ticket = data?.data;
  const { confirmAlert, basicAlert } = alerts();

  const resolveTicketHandler = async () => {
    const result = await confirmAlert(
      'Are you sure you want to resolve this ticket?',
    );
    if (result.isConfirmed) {
      const res = await resolveTicket({
        id: ticketId,
      });
      if (res.data) {
        basicAlert('Verified!', 'The Ticket Has Been Resolved', 'success');
      } else if (res.error) {
        basicAlert('Failed!', res.error.data.message, 'error');
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      basicAlert('Cancelled', 'The Ticket Resolution Cancelled', 'error');
    }
  };

  return (
    <DefaultLayout>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-boxdark shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
            Ticket Details
          </h1>
          <div className="mb-4">
            <label className="block text-black dark:text-white font-bold mb-2">
              Name:
            </label>
            <p className="text-black dark:text-white">{ticket.userName}</p>
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white font-bold mb-2">
              Email:
            </label>
            <p className="text-black dark:text-white">{ticket.userEmail}</p>
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white font-bold mb-2">
              Subject:
            </label>
            <p className="text-black dark:text-white">{ticket.userSubject}</p>
          </div>
          <div className="mb-4">
            <label className="block text-black dark:text-white font-bold mb-2">
              Message:
            </label>
            <p className="text-black dark:text-white">{ticket.userMessage}</p>
          </div>
          {ticket.status === 'pending' && (
            <button
              onClick={resolveTicketHandler}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded  dark:text-white hover:bg-blue-700"
            >
              Resolve
            </button>
          )}
        </div>
      )}
    </DefaultLayout>
  );
};

export default TicketDetails;
