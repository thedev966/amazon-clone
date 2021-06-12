import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Subtotal from "../components/Subtotal";
import "../css/Checkout.css";
import { selectBasket } from "../features/basketSlice";
import { selectUser } from "../features/userSlice";
import CheckoutItem from "../components/CheckoutItem";

const Checkout = () => {
  const basket = useSelector(selectBasket);
  const user = useSelector(selectUser);
  console.log(basket);

  return (
    <div className="checkout">
      <Navbar />
      <div className="checkout__body">
        <div className="checkout__body__left">
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img16/GiftCards/CorpGCPages/InterMiles_Banner_PC.jpg"
            alt="ad-banner"
          />
          <h3 className="checkout__welcomeMessage">
            Hello <span>{user?.email}.</span> Welcome to Checkout page.
          </h3>
          <h2>Your Shopping Basket</h2>
          <div className="checkout__items">
            {basket.map((item) => (
              <CheckoutItem
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        </div>
        <div className="checkout__body__right">
          <Subtotal />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
