import React from "react";
import { useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import "../css/Subtotal.css";
import { selectBasket } from "../features/basketSlice";

const Subtotal = () => {
  const basket = useSelector(selectBasket);
  const history = useHistory();
  const calculateTotalPrice = (basket) => {
    let total = 0;

    basket.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  const redirectToPayment = () => {
    if (basket.length > 0) {
      history.push("/payment");
    }
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p className="subtotal__header">
              Subtotal ({basket.length} items):
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
            <button onClick={redirectToPayment} className="subtotal__button">
              Proceed to checkout
            </button>
          </>
        )}
        decimalScale={2}
        value={calculateTotalPrice(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
};

export default Subtotal;
