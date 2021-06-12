import { React, useEffect, useRef, useState } from "react";
import "../css/Payment.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import { selectBasket, emptyBasket } from "../features/basketSlice";
import Navbar from "../components/Navbar";
import CheckoutItem from "../components/CheckoutItem";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { calculateTotalPrice } from "../features/basketSlice";
import axios from "../axios";
import { db } from "../firebase";

const Payment = () => {
  const basket = useSelector(selectBasket);
  const user = useSelector(selectUser);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [proccessing, setProccessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // go and get client secret from backend in order to charge a cient
    const getClientSecret = async () => {
      const response = await axios({
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": true,
        },
        url: "/payments/create?total=" + calculateTotalPrice(basket) * 100,
      });

      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log(clientSecret);

  const handleForm = async (e) => {
    e.preventDefault();
    setProccessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        console.log(paymentIntent);
        dispatch(emptyBasket());
        db.collection("orders")
          .add({
            user_id: user?.id,
            order_id: paymentIntent.id,
            total_price: paymentIntent.amount,
            date: paymentIntent.created,
            items: basket,
          })
          .then((promise) => console.log(promise))
          .catch((err) => console.log(err.message));

        setSucceeded(true);
        setProccessing(false);
        setError(null);
        history.replace("/orders");
      });
  };

  const handleCardInput = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <Navbar />
      <div className="payment__itemsCount">
        <h3>
          Checkout (
          <Link className="payment__itemsCount__link" to="/checkout">
            {basket.length}
          </Link>{" "}
          items)
        </h3>
      </div>
      <div className="payment__delivery">
        <p className="payment__item">Delivery address</p>
        <div className="payment__item__content">
          <span>{user.email}</span>
          <span>1234 Dummy address</span>
          <span>Washington, DC</span>
        </div>
      </div>
      <div className="payment__itemsReview">
        <p className="payment__item">Review items and delivery</p>
        <div className="payment__item__content">
          {basket.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
      <div className="payment__cardProccessing">
        <p className="payment__item">Payment method</p>
        <div className="payment__item__content">
          <form onSubmit={handleForm}>
            <CardElement onChange={handleCardInput} />
            <div className="payment__totalPrice">
              <CurrencyFormat
                renderText={(value) => (
                  <>
                    <p className="payment__total">Order total: {value}</p>
                  </>
                )}
                decimalScale={2}
                value={calculateTotalPrice(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              <button
                class="payment__orderBtn"
                disabled={proccessing || disabled || succeeded}
              >
                <span>{proccessing ? "Proccessing" : "Complete Order"}</span>
              </button>

              {error && <div>{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
