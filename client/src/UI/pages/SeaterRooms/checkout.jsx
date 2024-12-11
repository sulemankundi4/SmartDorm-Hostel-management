import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CheckoutFormMuliseater from './checkOutFormMultiseater';

const stripePromise = loadStripe(
  'pk_test_51OpxJmSDEk5tpsIO4Pz62SwU5MlvPtdF8MlqYSbL4vp0XzmOs5KRrd6ZVcn9mw83K6ElWqVtEAUqs3JwqCMaaExQ00UtzhLOCO',
);

const CheckOutMultiseater = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    clientSecret,
    hostelId,
    roomNumber,
    seaterType,
    count,
    amount,
    ownerId,
  } = location.state || {};

  if (!clientSecret) return <Navigate to={'/'} />;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckoutFormMuliseater
        hostelId={hostelId}
        amount={amount}
        ownerId={ownerId}
        roomNumber={roomNumber}
        seaterType={seaterType}
        count={count}
      />
    </Elements>
  );
};

export default CheckOutMultiseater;
