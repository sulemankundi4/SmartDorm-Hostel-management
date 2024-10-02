import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableThree from '../../components/Tables/TableThree';
import { useSelector } from 'react-redux';
import { useGetAllUsersQuery } from '../../../Redux/api/userApi';
import toast from 'react-hot-toast';
import DefaultLayout from '../../layout/DefaultLayout';
import Loader from '../../common/Loader';

const AllUsers = () => {
  const { user } = useSelector((s) => s.userReducer);

  const { data, error, isLoading, isError } = useGetAllUsersQuery(user._id);
  if (isError) {
    return toast.error(error.data.message);
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Users" />
      {isLoading ? <Loader /> : <TableThree usersData={data?.payLoad.users} />}
    </DefaultLayout>
  );
};

export default AllUsers;
