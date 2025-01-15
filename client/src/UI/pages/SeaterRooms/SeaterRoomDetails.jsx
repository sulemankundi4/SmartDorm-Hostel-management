import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetListingDetailsQuery } from '../../../Redux/api/hostelApis';
import { FaBed } from 'react-icons/fa';
import Footer from '../../components/footer';
import Navbar from './../../components/navBar';
import TopBar from './../../components/topBar';

const SeaterRoomDetails = () => {
  const { hostelId, seaterType } = useParams();
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

  const seaterRooms = hostelData.SeaterRooms.filter(
    (room) => room.seaterType === parseInt(seaterType),
  );

  return (
    <>
      <div className="mb-16">
        <TopBar />
        <Navbar />
      </div>
      <div className="container mx-auto py-12">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          {seaterType}-Seater Rooms
        </h2>
        {seaterRooms.length === 0 ? (
          <p className="text-red-500 text-center text-2xl font-bold">
            No Seats available
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seaterRooms.map((seaterRoom, seaterIndex) => (
              <div
                key={seaterIndex}
                className="bg-white shadow-lg rounded-lg p-8 text-center transform transition duration-500 hover:scale-105"
              >
                <h3 className="text-2xl text-black font-semibold mb-4">
                  {seaterRoom.seaterType}-Seater Room
                </h3>
                <div className="flex justify-center mb-4">
                  {getImageForSeaterType(seaterRoom.seaterType)}
                </div>
                <p className="text-gray-600 mb-4">
                  {seaterRoom.rooms.length} seats available
                </p>
                <div className="text-gray-600 mb-4">
                  {seaterRoom.rooms.map((room, roomIndex) => (
                    <p key={roomIndex}>Seat Number: {room.roomNumber}</p>
                  ))}
                </div>
                <button
                  className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
                  onClick={() =>
                    navigate(
                      `/bookRoom/${hostelId}/${seaterRoom.seaterType}/${seaterRoom.count}`,
                    )
                  }
                >
                  View Rooms
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SeaterRoomDetails;
