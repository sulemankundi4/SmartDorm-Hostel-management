import React from 'react';

const Validators = () => {
  const validateGmail = (email) => {
    const extension = email.split('@')[1];
    if (extension === 'gmail.com') {
      return true;
    }
    return false;
  };

  const comparePasswords = (password, confirmPassword) => {
    if (password === confirmPassword) {
      return true;
    }
    return false;
  };

  const isStrongPassword = (password) => {
    const regex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    return regex.test(password);
  };

  return { validateGmail, comparePasswords, isStrongPassword };
};

export default Validators;
