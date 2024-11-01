import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useResetPasswordMutation,
  useValidatePasswordResetTokenMutation,
} from '../../Redux/api/userApi';
import toast from 'react-hot-toast';
import Validators from '../../utils/validators';
import { FaHouseMedicalCircleExclamation } from 'react-icons/fa6';

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    Password: '',
    ConfirmPassword: '',
  });
  const { token } = useParams();
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const [validateToken] = useValidatePasswordResetTokenMutation();

  useEffect(() => {
    const validate = async () => {
      try {
        const response = await validateToken({ token });
        if (response.error) {
          return navigate('/');
        }
        setIsLoading(false);
      } catch (e) {
        navigate('/');
      }
    };

    if (!token) {
      navigate('/');
    } else {
      validate();
    }
  }, [token, navigate, validateToken]);

  const { comparePasswords, isStrongPassword } = Validators();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comparePasswords(formData.Password, formData.ConfirmPassword)) {
      toast.error('Passwords and confirm Password do not match!', {
        position: 'bottom-center',
      });
      setFormData({ Password: '', ConfirmPassword: '' });
      return;
    }

    if (!isStrongPassword(formData.Password)) {
      toast.error(
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and at least 8 characters long!',
        {
          position: 'bottom-center',
        },
      );
      setFormData({ Password: '', ConfirmPassword: '' });
      return;
    }
    try {
      const response = await resetPassword({ token, ...formData });
      if (response.error) {
        return toast.error(response.error.data.message);
      }
      toast.success('Password has been reset successfully');
      navigate('/signin');
    } catch (e) {
      setFormData({ Password: '', ConfirmPassword: '' });
      return toast.error('Something went wrong');
    }
  };

  return (
    <>
      {!isLoading && (
        <div className="rounded-sm min-h-screen flex items-center sm:justify-center px-[1rem] sm:px-0 bg-white">
          <div className="flex flex-wrap items-center py-10 w-full">
            <div className="w-full sm:w-[30rem] shadow-9 mx-auto rounded-md">
              <div className="w-full p-4 sm:p-12.5 xl:p-10">
                <span className="mb-1.5 block font-medium">Reset Password</span>
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Enter New Password
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        placeholder="Enter your new password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="ConfirmPassword"
                        value={formData.ConfirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your new password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Reset Password"
                      className="py-1 px-5 h-12 inline-block tracking-wide align-middle duration-500 text-lg text-center font-medium bg-red-500 text-white rounded-md w-full cursor-pointer"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
