import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar, AiOutlineClose } from 'react-icons/ai';

const ReviewModal = ({ booking, closeModal }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState('');

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <AiOutlineClose size={24} />
        </button>
        <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">
          Review {booking.HostelName.HostelName}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => handleRating(star)}
                className="focus:outline-none"
              >
                {star <= rating ? (
                  <AiFillStar className="text-yellow-500" size={24} />
                ) : (
                  <AiOutlineStar className="text-yellow-500" size={24} />
                )}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <textarea
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              rows="4"
              placeholder="Write your review here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
