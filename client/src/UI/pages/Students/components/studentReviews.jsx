import React, { useState } from 'react';
import TopBar from '../../../components/topBar';
import Navbar from '../../../components/navBar';
import SideBar from '../components/sideBar';
import { useSelector } from 'react-redux';
import { useGetBookingsQuery } from '../../../../Redux/api/singleRoomBookingsApis';
import {
  useAddReviewMutation,
  useHasUserReviewedHostelQuery,
} from '../../../../Redux/api/reviewsApis';
import toast from 'react-hot-toast';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const StudentReviews = () => {
  const { user } = useSelector((state) => state.userReducer);
  const { data, isLoading, isError } = useGetBookingsQuery({
    userId: user._id,
    isStudent: true,
  });

  const [selectedHostel, setSelectedHostel] = useState(null);
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');
  const [addReview] = useAddReviewMutation();
  const { data: reviewData, refetch } = useHasUserReviewedHostelQuery(
    {
      userId: user._id,
      hostelId: selectedHostel?.HostelName._id,
    },
    { skip: !selectedHostel },
  );

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const review = await addReview({
        body: {
          Ratings: rating,
          Description: description,
          UserName: user._id,
          HostelName: selectedHostel.HostelName._id,
        },
      });
      if (review.error) {
        return toast.error('An error occurred while submitting your review');
      }
      toast.success('Review submitted successfully');
      setSelectedHostel(null);
      setRating(0);
      setDescription('');
      refetch();
    } catch (e) {
      toast.error('An error occurred while submitting your review');
    }
  };

  const confirmedBookings = data?.bookings.filter(
    (booking) => booking.Status === 'confirmed',
  );

  if (isError) {
    return toast.error('An error occurred while fetching your bookings');
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <section className="relative w-[94%] mx-auto lg:pb-24 pb-16 md:mt-[84px] mt-[70px] bg-white dark:bg-gray-900">
        <div className="container relative md:mt-24 mt-16">
          <div className="md:flex">
            <SideBar />
            <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6">
              <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800">
                <h5 className="text-lg font-semibold mb-4 text-black dark:text-white">
                  Review Your Hostel
                </h5>
                {isLoading ? (
                  <div>Loading...</div>
                ) : confirmedBookings?.length === 0 ? (
                  <div className="text-center text-xl font-bold text-red-500 dark:text-red-400">
                    No confirmed bookings found.
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <label
                        htmlFor="hostel"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Select Hostel
                      </label>
                      <select
                        id="hostel"
                        name="hostel"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                        value={selectedHostel?._id || ''}
                        onChange={(e) =>
                          setSelectedHostel(
                            confirmedBookings.find(
                              (booking) => booking._id === e.target.value,
                            ),
                          )
                        }
                      >
                        <option value="" disabled>
                          Select a hostel
                        </option>
                        {confirmedBookings.map((booking) => (
                          <option key={booking._id} value={booking._id}>
                            {booking.HostelName.HostelName}
                          </option>
                        ))}
                      </select>
                    </div>
                    {selectedHostel && reviewData?.data?.hasReviewed ? (
                      <div className="bg-gray-100 p-4 rounded-lg dark:bg-gray-700">
                        <h4 className="text-lg font-bold text-black dark:text-white">
                          Your Review
                        </h4>
                        <div className="flex items-center mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <AiFillStar
                              key={star}
                              className={`${
                                star <= reviewData.data.userReview.Ratings
                                  ? 'text-yellow-500'
                                  : 'text-gray-300'
                              }`}
                              size={24}
                            />
                          ))}
                        </div>
                        <p className="text-black dark:text-gray-300">
                          {reviewData.data.userReview.Description}
                        </p>
                      </div>
                    ) : (
                      selectedHostel && (
                        <form onSubmit={handleSubmit}>
                          <div className="mb-4">
                            <label
                              htmlFor="rating"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Rating
                            </label>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => handleRating(star)}
                                  className="focus:outline-none"
                                >
                                  {star <= rating ? (
                                    <AiFillStar
                                      className="text-yellow-500"
                                      size={24}
                                    />
                                  ) : (
                                    <AiOutlineStar
                                      className="text-yellow-500"
                                      size={24}
                                    />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="mb-4">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Review Description
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
                              rows="4"
                              placeholder="Write your review here..."
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                          <div className="flex justify-end">
                            <button
                              type="submit"
                              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                              Submit Review
                            </button>
                          </div>
                        </form>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentReviews;
