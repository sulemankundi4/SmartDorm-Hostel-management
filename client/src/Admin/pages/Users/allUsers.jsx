import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableThree from '../../components/Tables/TableThree';
import { useSelector } from 'react-redux';
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from '../../../Redux/api/userApi';
import toast from 'react-hot-toast';
import DefaultLayout from '../../layout/DefaultLayout';
import Loader from '../../common/Loader';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const { user } = useSelector((s) => s.userReducer);

  const { data, error, isLoading, isError } = useGetAllUsersQuery(user._id);
  const [deleteUser] = useDeleteUserMutation();

  if (isError) {
    return toast.error(error.data.message);
  }

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteUser({ id: userId, userId: user._id });
        if (response.error) {
          return toast.error(response.error.data.message);
        }
        toast.success('User deleted successfully');
      } catch (e) {
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Users" />
      {isLoading ? (
        <Loader />
      ) : (
        <TableThree usersData={data?.payLoad.users} onDelete={handleDelete} />
      )}
    </DefaultLayout>
  );
};

export default AllUsers;
