import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetListingDetailsQuery } from '../../../Redux/api/hostelApis';
import { FaBed } from 'react-icons/fa';
import Footer from '../../components/footer';
import Navbar from './../../components/navBar';
import TopBar from './../../components/topBar';

const SeaterRooms = () => {
  const { hostelId } = useParams();
  const { data, isLoading } = useGetListingDetailsQuery({
    listingId: hostelId,
  });
  const navigate = useNavigate();
  const hostelData = data?.payLoad;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const getImageForSeaterType = (seaterType) => {
    const bedIcons = [];
    for (let i = 0; i < seaterType; i++) {
      bedIcons.push(<FaBed key={i} className="text-6xl text-red-500 mx-1" />);
    }
    return bedIcons;
  };

  const handleCardClick = (seaterType) => {
    navigate(`/seaterRooms/${hostelId}/${seaterType}`);
  };

  return (
    <>
      <div className="mb-16">
        <TopBar />
        <Navbar />
      </div>
      <div className="container mx-auto py-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          Select a Seater Room
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[2, 3, 4].map((seaterType) => (
            <div
              key={seaterType}
              className="bg-white shadow-lg rounded-lg p-8 text-center transform transition duration-500 hover:scale-105 cursor-pointer"
              onClick={() => handleCardClick(seaterType)}
            >
              <h3 className="text-2xl text-black font-semibold mb-4">
                {seaterType}-Seater Room
              </h3>
              <div className="flex justify-center mb-4">
                {getImageForSeaterType(seaterType)}
              </div>
              <p className="text-gray-600 mb-4">
                {
                  hostelData.SeaterRooms.filter(
                    (room) => room.seaterType === seaterType,
                  ).length
                }{' '}
                rooms available
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SeaterRooms;
