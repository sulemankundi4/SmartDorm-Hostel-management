import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetListingDetailsQuery } from '../../../Redux/api/hostelApis';
import { useNavigate } from 'react-router-dom';
import { FaBed } from 'react-icons/fa';
import Navbar from '../../components/navBar';
import Footer from '../../components/footer';
import { useSelector } from 'react-redux';
import { useMatchUserPreferencesQuery } from '../../../Redux/api/userPreferencesApi';

const SeaterRooms = () => {
  const { hostelId } = useParams();
  const { data, isLoading } = useGetListingDetailsQuery({
    listingId: hostelId,
  });
  const navigate = useNavigate();
  const hostelData = data?.payLoad;
  const { user } = useSelector((state) => state.userReducer);
  const { data: matchedUsers, refetch } = useMatchUserPreferencesQuery(
    user._id,
  );
  const [showModal, setShowModal] = useState(false);

  console.log(matchedUsers);

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

  const handleMatchPreferences = () => {
    refetch();
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className="container mx-auto py-12">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300 mb-8"
          onClick={handleMatchPreferences}
        >
          Match Preferences
        </button>
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          Select a Seater Room
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hostelData.SeaterRooms.map((seaterRoom, seaterIndex) => (
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
                {seaterRoom.rooms.length} rooms available
              </p>
              <div className="text-gray-600 mb-4">
                {seaterRoom.rooms.map((room, roomIndex) => (
                  <p key={roomIndex}>Room Number: {room.roomNumber}</p>
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
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Matched Users</h2>
              {matchedUsers?.data.length > 0 ? (
                matchedUsers.data.map((user, index) => (
                  <div key={index} className="mb-4 flex justify-between">
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Match Percentage:</strong> {user.matchPercentage}%
                    </p>
                  </div>
                ))
              ) : (
                <p>No matched users found.</p>
              )}
              <button
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SeaterRooms;
