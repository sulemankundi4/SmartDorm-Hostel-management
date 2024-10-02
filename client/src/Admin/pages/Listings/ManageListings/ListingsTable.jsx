import React from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../../layout/DefaultLayout';
import Loader from '../../../common/Loader';
import ViewListingTable from './viewListingTable';
import { useSelector } from 'react-redux';
import { useOwnerListingQuery } from '../../../../Redux/api/hostelApis';

const ListingsTable = () => {
  const { user } = useSelector((s) => s.userReducer);

  const { data, isLoading, error } = useOwnerListingQuery({ id: user._id });

  const listingData = data?.payLoad;
  return (
    <DefaultLayout>
      <Breadcrumb pageName="All Listings to manage" />
      {isLoading ? <Loader /> : <ViewListingTable listingData={listingData} />}
    </DefaultLayout>
  );
};

export default ListingsTable;
