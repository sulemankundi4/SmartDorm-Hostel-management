import React, { useEffect, useState } from 'react';
import { useResendEmailMutation } from '../../Redux/api/userApi';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const VerifyEmail = () => {
  const { user } = useSelector((s) => s.userReducer);
  if (user?.IsEmailVerified) {
    return <Navigate to="/" />;
  }
  const [isButtonDisabled, setButtonDisabled] = useState(
    localStorage.getItem('isButtonDisabled') === 'true',
  );
  const [countdown, setCountdown] = useState(
    parseInt(localStorage.getItem('countdown')) || 60,
  );

  const [resendEmail] = useResendEmailMutation();

  const handleClick = async () => {
    setButtonDisabled(true);
    localStorage.setItem('isButtonDisabled', 'true');
    // Call your function to resend the email here
    try {
      const res = await resendEmail(user?.Email);
      if (res.error) return toast.error('Email could not be sent');

      toast.success('Email has been sent to the user');
    } catch (e) {
      toast.error('Some thing went wrong during email sending');
    }
  };

  useEffect(() => {
    let timer;
    if (isButtonDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
        localStorage.setItem('countdown', countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setButtonDisabled(false);
      setCountdown(60);
      localStorage.removeItem('isButtonDisabled');
      localStorage.removeItem('countdown');
    }
    return () => clearTimeout(timer);
  }, [isButtonDisabled, countdown]);

  return (
    <div className="relative font-inter antialiased bg-white">
      <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-[43rem] mx-auto px-4 md:px-6 py-24">
          <div className="flex justify-center shadow-2xl rounded-md">
            <div className="h-[19rem] max-w-[43rem] mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
              <header className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Verify Your Email</h1>
                <p className="text-[18px] text-slate-500">
                  Hey, It looks like you just signed up for The App, that’s
                  awesome! Can we ask you for email confirmation? We have
                  already sent the verification Link
                </p>
              </header>

              <div className="text-sm text-slate-500 mt-4">
                <button
                  className="mt-6 flex items-center justify-center gap-2 py-1 px-5 h-12 tracking-wide align-middle duration-500 text-lg text-center font-medium bg-red-500 text-white rounded-md w-full cursor-pointer disabled:cursor-not-allowed"
                  onClick={handleClick}
                  disabled={isButtonDisabled}
                >
                  Resend Email
                </button>
                {isButtonDisabled && (
                  <p className="font-medium text-md mt-4">
                    Wait for {countdown} seconds before resending the email
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyEmail;
