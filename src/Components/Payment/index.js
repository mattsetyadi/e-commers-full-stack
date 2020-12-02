import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../StateProvider';
import CheckoutProduct from '../Checkout/CheckoutProduct';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../../reducer';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from '../../axios';
import './Payment.css';

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  // use effect below, whenever the basket changes, it will make request and will update stripe secreet (paymentcode frfom stripe)
  // which allow us to charge the custommers the correct amount
  useEffect(() => {
    //generate the special stripe secret which allows us to charge the customers
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post',
        //stripe expects the total in a currencies sub-units
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log('THE SECRET IS >>', clientSecret);

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        //if success or everything good
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        // we don't wanna push here, so user sfer payment succeeded tey cant go back (replace that page-no history)
        history.replace('/orders');
      });
  };

  const handleChange = (event) => {
    // listen for change in the CardElements
    // and display any errors as the custommer types tehir card details
    // clientSecret is how the stripe knows how much to charge customer(client)
    setDisabled(event.empty);
    setError(event.error ? event.error.messages : '');
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (
          <Link className="a__items" to="/checkout">
            {basket?.length} items
          </Link>
          )
        </h1>
        {/* Delivery address - for now just hard code */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Adress</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Street</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review item and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                alt={item.alt}
              />
            ))}
          </div>
        </div>

        {/* payment */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                </button>
              </div>
              {/* eroor mesages */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
