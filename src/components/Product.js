import React from "react";
import { useDispatch } from "react-redux";
import "../css/Product.css";
import { addToBasket } from "../features/basketSlice";

const Product = ({ id, title, price, rating, image }) => {
  const dispatch = useDispatch();

  const renderRating = () => {
    for (let i = 0; i < rating; i++) {
      <span className="product__star">&#9734;</span>;
      i++;
    }
  };

  const addItemToBasket = () => {
    dispatch(
      addToBasket({
        id: id,
        title: title,
        price: price,
        rating: rating,
        image: image,
      })
    );
  };

  return (
    <div className="product">
      <div className="product__info">
        <h3 className="product__title">{title}</h3>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">{() => renderRating()}</div>
      </div>
      <div className="product__image">
        <img src={image} alt="" />
      </div>
      <button onClick={addItemToBasket} className="add__to__cart">
        Add to cart
      </button>
    </div>
  );
};

export default Product;
