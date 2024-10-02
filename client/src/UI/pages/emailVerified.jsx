import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
const VerifyEmail = () => {
  const { user } = useSelector((s) => s.userReducer);

  if (user?.IsEmailVerified) {
    return <Navigate to="/" />;
  }
  return (
    <div className="relative font-inter antialiased bg-white">
      <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-[43rem] mx-auto px-4 md:px-6 py-24">
          <div className="flex justify-center shadow-2xl rounded-md">
            <div className="h-[17rem] max-w-[43rem] mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
              <header className="mb-8">
                <h1 className="text-3xl font-bold mb-4">
                  Your Email has been Verified!
                </h1>
                <p className="text-[18px] text-slate-500">
                  Your Email has been verified successfully. You can now login
                  and enjoy the app.
                </p>
                <Link
                  className="mt-12 flex items-center justify-center gap-2 py-1 px-5 h-12 tracking-wide align-middle duration-500 text-lg text-center font-medium bg-red-500 text-white rounded-md w-full cursor-pointer "
                  to="/signin"
                >
                  Back to Login
                </Link>
              </header>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VerifyEmail;
