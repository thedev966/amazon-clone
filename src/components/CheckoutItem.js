import React from "react";
import { useDispatch } from "react-redux";
import { removeFromBasket } from "../features/basketSlice";

const CheckoutItem = ({ id, title, image, price, hideButton }) => {
  const dispatch = useDispatch();

  const removeItemFromBasket = (item_id) => {
    console.log(item_id);
    dispatch(
      removeFromBasket({
        id: item_id,
      })
    );
  };

  return (
    <div className="checkout__item">
      <div className="checkout__item__left">
        <img src={image} />
      </div>
      <div className="checkout__item__right">
        <h2>{title}</h2>
        <div className="checkout__item__price">
          <small>$</small>
          <p>{price}</p>
        </div>
        {!hideButton && (
          <button onClick={() => removeItemFromBasket(id)}>
            Remove from basket
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutItem;
