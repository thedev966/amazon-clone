import React from "react";
import CheckoutItem from "./CheckoutItem";
import "../css/Order.css";
import moment from "moment";

const Order = ({ order_id, items, date, total_price }) => {
  return (
    <div className="order">
      <div className="order__id">
        <div className="order__title">Order ID:</div>
        <div className="order__content">{order_id}</div>
      </div>

      <div className="order__date">
        <div className="order__title">Order date:</div>
        <div className="order__content">{moment.unix(date).format("LLL")}</div>
      </div>

      <div className="order__items">
        <div className="order__title">Order items:</div>
        <div className="order__content">
          {items.map((item) => (
            <CheckoutItem
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              hideButton
            />
          ))}
        </div>
      </div>
      <div className="order__total">
        <div className="order__title">Total Price:</div>
        <div className="order__content">$ {total_price / 100}</div>
      </div>
    </div>
  );
};

export default Order;
