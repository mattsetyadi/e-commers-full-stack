import React from "react";
import "./Product.css";
import { useStateValue } from "../../StateProvider";

const Product = ({ id, title, image, price, rating, alt }) => {
  //state diubah menjadi {basket} yang diambil dari initialState di reducer.js
  const [{ basket }, dispatch] = useStateValue();
  // dispatch digunakan untuk memanipulasi data
  // seperti pistol juga yang menembak data ke data layer

  //mengecek isi basket yang akan diambil untuk icon basket di navbar
  // console.log("this is the basket >>>", basket);

  const addToBasket = () => {
    // dispatch the item to data layer (state provider)
    dispatch({
      type: "ADD_TO_BASKET", //kunci atau jalan patch yang digunakan
      item: {
        //id, title, image yg kanan diambil dari produk
        //yang kiri inisial yang akan di buat di data layer dan akan diambil
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        alt: alt,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
          {/* <p>⭐</p> */}
        </div>
      </div>
      <img src={image} alt={alt} />

      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
};

export default Product;
