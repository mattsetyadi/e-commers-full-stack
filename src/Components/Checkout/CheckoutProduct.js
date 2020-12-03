import React from 'react';
import { useStateValue } from '../../StateProvider';
import './CheckoutProduct.css';

//props berkut yang akan di passing dan mengambil isinya dari basket
const CheckoutProduct = ({
  id,
  image,
  title,
  price,
  rating,
  alt,
  hideButton,
}) => {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    //remove item from basket, using dispatch
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    });
  };

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt={alt} />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutProduct;
