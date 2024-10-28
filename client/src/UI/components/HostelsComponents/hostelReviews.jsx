import React, { useEffect } from 'react';
import { BsStarFill } from 'react-icons/bs';
// import '../js/script.js';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useGetAllReviewsOfHostelQuery } from '../../../Redux/api/reviewsApis';
import { AiFillStar } from 'react-icons/ai';
const HostelReviews = ({ hostelId }) => {
  useEffect(() => {
    var swiper = new Swiper('.mySwiper', {
      slidesPerView: 2,
      spaceBetween: 32,
      centeredSlides: false,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: false,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 28,
          centeredSlides: false,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 13,
        },
      },
    });
  }, []);
  const { data: hostelReviews, isLoading } = useGetAllReviewsOfHostelQuery({
    hostelId,
  });

  console.log(hostelReviews);

  const printStars = (rating) => {
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<BsStarFill />);
    }
    return stars;
  };

  return (
    <>
      {isLoading ? null : (
        <section className="py-24 ">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 max-w-sm sm:max-w-2xl lg:max-w-full mx-auto">
              <div className="w-full lg:w-2/5">
                <span className="text-sm text-black font-medium mb-4 block">
                  Hostel Reviews
                </span>
                <h2 className="text-4xl font-bold text-black leading-[3.25rem] mb-8">
                  23k+ Customers gave their
                  <span className=" text-transparent bg-clip-text bg-gradient-to-tr from-red-400 to-red-500">
                    Feedback
                  </span>
                </h2>
              </div>
              <div className="w-full lg:w-3/5">
                {/* {hostelReviews.data.reviews.map((review) => (
                  <div className="swiper-slide group bg-white border border-solid border-gray-300 rounded-2xl max-sm:max-w-sm max-sm:mx-auto p-5 transition-all duration-500 hover:border-indigo-600">
                    <div className="flex items-center gap-5 mb-3 sm:mb-7">
                      <img
                        className="rounded-full"
                        src="https://pagedone.io/asset/uploads/1696229969.png"
                        alt="avatar"
                      />
                      <div className="grid gap-1">
                        <h5 className="text-black font-medium transition-all duration-500  ">
                          {review.UserName.Name}
                        </h5>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 sm:mb-4 gap-2 text-amber-500 transition-all duration-500  ">
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                      <BsStarFill />
                    </div>
                    <p className="text-sm text-black font-medium leading-6 transition-all duration-500 min-h-18">
                      {review.review}
                    </p>
                  </div>
                ))} */}
                <div className="swiper mySwiper">
                  <div className="swiper-wrapper">
                    {hostelReviews.data.reviews.map((review) => (
                      <div className="swiper-slide group bg-white border border-solid border-gray-300 rounded-2xl max-sm:max-w-sm max-sm:mx-auto p-5 transition-all duration-500 hover:border-indigo-600">
                        <div className="flex items-center gap-5 mb-3 sm:mb-7">
                          <img
                            className="rounded-full h-8 w-8 md:w-12 md:h-12 cursor-pointer"
                            src={`https://api.dicebear.com/5.x/initials/svg?seed=${review?.UserName.Name}`}
                            alt=""
                          />
                          <div className="grid gap-1">
                            <h5 className="text-black font-medium transition-all duration-500  ">
                              {review.UserName.Name}
                            </h5>
                          </div>
                        </div>
                        <div className="flex items-center mb-4 sm:mb-4 gap-2 text-amber-500 transition-all duration-500  ">
                          {[1, 2, 3, 4, 5].map(
                            (star) =>
                              star <= review.Ratings && (
                                <AiFillStar
                                  key={star}
                                  className="text-yellow-500"
                                  size={18}
                                />
                              ),
                          )}
                        </div>
                        <p className="text-sm text-black font-medium leading-6 transition-all duration-500 min-h-18">
                          {review.Description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HostelReviews;
