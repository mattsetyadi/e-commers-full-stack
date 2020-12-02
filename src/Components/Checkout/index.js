import React from "react";
import "./Checkout.css";
import AdImg from "../../assets/images/ad.jpg";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../../StateProvider";

const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  // console.log("basket checkout >>>", basket);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img className="checkout__ad" src={AdImg} alt="immg ad" />
        <div>
          <h3 className="checkout__h3">Hello, {user ? user.email : "Guest"}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>

          {/* props nya udah di buat di Checkout product apa saja yang akan dimasukan
          tapi kita mengambil isi produknya dari basket karena sama isinya seperti pada props
          dan diambil dari home page, agar dinamis */}
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
