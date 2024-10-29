import React, { useState } from 'react';
import TopBar from '../components/topBar';
import Navbar from '../components/navBar';
import contactUsImg from '../../assets/Images/travel-train-station.svg';
import { FaPhone } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { IoLocation } from 'react-icons/io5';
import Footer from '../components/footer';
import { useCreateTicketMutation } from '../../Redux/api/ticketApis';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userSubject: '',
    userMessage: '',
  });

  const [submitTicket] = useCreateTicketMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { userEmail, userMessage, userSubject, userName } = formData;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!userName || !userEmail || !userSubject || !userMessage) {
      return toast.error('All fields are required');
    }
    try {
      const res = await submitTicket({ data: formData });

      if (res.error) {
        setFormData({
          userName: '',
          userEmail: '',
          userSubject: '',
          userMessage: '',
        });
        return toast.error('Cannot submit ticket right now!');
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Ticket submitted successfully admin will reply to you ASAP!',
      });
      setFormData({
        userName: '',
        userEmail: '',
        userSubject: '',
        userMessage: '',
      });
      navigate('/');
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <>
      <div className="bg-white">
        <TopBar />
        <Navbar />
        <div className="container-fluid relative mt-20">
          <div className="grid grid-cols-1">
            <div className="w-full leading-[0] border-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin"
                style={{ border: '0' }}
                className="w-full h-[500px]"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <section className="relative lg:py-24 py-16 w-[93%] mx-auto">
          <div className="container">
            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
              <div className="lg:col-span-7 md:col-span-6">
                <img
                  src={contactUsImg}
                  className="w-full max-w-[500px] mx-auto"
                  alt=""
                />
              </div>

              <div className="lg:col-span-5 md:col-span-6">
                <div className="lg:ms-5">
                  <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-800 p-6">
                    <h3 className="mb-6 text-2xl text-black leading-normal font-semibold">
                      Get in touch !
                    </h3>

                    <form onSubmit={submitHandler}>
                      <p className="mb-0"></p>
                      <div id="simple-msg"></div>
                      <div className="grid lg:grid-cols-12 grid-cols-1 gap-3">
                        <div className="lg:col-span-6 text-black">
                          <label for="name" className="font-semibold">
                            Your Name:
                          </label>
                          <input
                            onChange={handleChange}
                            name="userName"
                            id="name"
                            type="text"
                            value={userName}
                            className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-[rgb(243,244,246)] dark:border-gray-800 focus:ring-0"
                            placeholder="Name :"
                          />
                        </div>

                        <div className="lg:col-span-6 text-black">
                          <label for="email" className="font-semibold">
                            Your Email:
                          </label>
                          <input
                            name="userEmail"
                            onChange={handleChange}
                            id="email"
                            value={userEmail}
                            type="email"
                            className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-[rgb(243,244,246)] dark:border-gray-800 focus:ring-0"
                            placeholder="Email :"
                          />
                        </div>

                        <div className="lg:col-span-12 text-black">
                          <label for="subject" className="font-semibold">
                            Your Subject:
                          </label>
                          <input
                            name="userSubject"
                            onChange={handleChange}
                            id="subject"
                            value={userSubject}
                            className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-[rgb(243,244,246)] dark:border-gray-800 focus:ring-0"
                            placeholder="Subject :"
                          />
                        </div>

                        <div className="lg:col-span-12 text-black">
                          <label for="comments" className="font-semibold">
                            Your Message:
                          </label>
                          <textarea
                            name="userMessage"
                            onChange={handleChange}
                            value={userMessage}
                            id="comments"
                            className="mt-2 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-[rgb(243,244,246)] dark:border-gray-800 focus:ring-0"
                            placeholder="Message :"
                          ></textarea>
                        </div>
                      </div>
                      <button
                        type="submit"
                        id="submit"
                        name="send"
                        className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-red-500 text-white rounded-md mt-2"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container lg:mt-24 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
              <div className="text-center px-6">
                <div className="relative text-transparent">
                  <div className="size-20 bg-red-500/5 text-red-500 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                    <FaPhone />
                  </div>
                </div>

                <div className="content mt-7">
                  <h5 className="h5 text-lg text-black font-semibold">Phone</h5>
                  <p className="text-slate-400 mt-3">
                    The phrasal sequence of the is now so that many campaign and
                    benefit
                  </p>

                  <div className="mt-5">
                    <a
                      href="tel:+152534-468-854"
                      className="text-red-500 font-medium"
                    >
                      +152 534-468-854
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-center px-6">
                <div className="relative text-transparent">
                  <div className="size-20 bg-red-500/5 text-red-500 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                    <MdEmail />
                  </div>
                </div>

                <div className="content mt-7">
                  <h5 className="h5 text-lg text-black font-semibold">Email</h5>
                  <p className="text-slate-400 mt-3">
                    The phrasal sequence of the is now so that many campaign and
                    benefit
                  </p>

                  <div className="mt-5">
                    <a
                      href="mailto:contact@example.com"
                      className="text-red-500 font-medium"
                    >
                      contact@example.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="text-center px-6">
                <div className="relative text-transparent">
                  <div className="size-20 bg-red-500/5 text-red-500 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                    <IoLocation />
                  </div>
                </div>

                <div className="content mt-7">
                  <h5 className="h5 text-lg text-black font-semibold">
                    Location
                  </h5>
                  <p className="text-slate-400 mt-3">
                    C/54 Northwest Freeway, Suite 558, <br />
                    Houston, USA 485
                  </p>

                  <div className="mt-5">
                    <a
                      href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin"
                      data-type="iframe"
                      className="video-play-icon read-more lightbox text-red-500 font-medium"
                    >
                      View on Google map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
