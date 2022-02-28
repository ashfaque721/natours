import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51KQtMnL2t2QQrYPmkdco6N4kXNMNLvv67tTEWzA9wdk7ev9NumbxwMhWGcPnCWVHZ4JRzuwB1yoim5JuA5wN8gwv00XwOoja8r'
);

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    showAlert('error', err);
  }
};
