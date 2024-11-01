import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../Redux/api/userApi';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword({ Email: email });
      if (response.error) {
        return toast.error(response.error.data.message);
      }
      toast.success('Password reset link has been sent to your email');
      setEmail('');
    } catch (e) {
      setEmail('');
      console.log(e);
      return toast.error('Something went wrong');
    }
  };

  return (
    <div className="rounded-sm min-h-screen flex items-center sm:justify-center px-[1rem] sm:px-0 bg-white">
      <div className="flex flex-wrap items-center py-10 w-full">
        <div className="w-full sm:w-[30rem] shadow-9 mx-auto rounded-md">
          <div className="w-full p-4 sm:p-12.5 xl:p-10">
            <span className="mb-1.5 block font-medium">Forgot Password</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Reset Your Password
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill=""
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Send Reset Link"
                  className="py-1 px-5 h-12 inline-block tracking-wide align-middle duration-500 text-lg text-center font-medium bg-red-500 text-white rounded-md w-full cursor-pointer"
                />
              </div>

              <div className="mt-6 text-center">
                <p>
                  Remember your password?{' '}
                  <Link to="/signin" className="text-primary">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
