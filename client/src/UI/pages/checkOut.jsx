import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './Listings/components/checkOutForm.jsx';

const stripePromise = loadStripe(
  'pk_test_51OpxJmSDEk5tpsIO4Pz62SwU5MlvPtdF8MlqYSbL4vp0XzmOs5KRrd6ZVcn9mw83K6ElWqVtEAUqs3JwqCMaaExQ00UtzhLOCO',
);

const clientSecret =
  'pi_3PgkafSDEk5tpsIO0Mxq28d9_secret_DlTfxsPO88fgcOzViWdhADWYj';
const CheckOut = () => {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default CheckOut;
