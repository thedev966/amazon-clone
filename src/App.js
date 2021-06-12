import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signOutUser, selectUser } from "./features/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./pages/Orders";

const promise = loadStripe(
  "pk_test_51IL4ZQBX1dF3b6qDe4132PmrJwXsWdhmrM5CEAJr9FbfAkuTWXxCGdPDuBfOHQ8wwvAvEhPTFUNMtMNKBwP8bBIV00X5fFavwo"
);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((auth) => {
      if (auth) {
        // user is logged in
        dispatch(
          loginUser({
            id: auth.uid,
            email: auth.email,
          })
        );
      } else {
        // user is logged out
        dispatch(signOutUser);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/checkout">
            {user ? <Checkout /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
          <Route path="/register">
            {!user ? <Register /> : <Redirect to="/" />}
          </Route>
          <Route path="/payment">
            {user ? (
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/orders">
            {user ? <Orders /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
