import React from "react";
import "../css/Navbar.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBasket } from "../features/basketSlice";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";

const Navbar = () => {
  const basket = useSelector(selectBasket);
  const user = useSelector(selectUser);

  const signOutUser = () => {
    if (user) {
      auth.signOut();
      window.location.reload();
    }
  };

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <Link className="navbar__link" to="/">
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="amazon-logo"
          />
        </Link>
      </div>
      <div className="navbar__search">
        <input type="text" />
        <SearchIcon className="search__icon" />
      </div>
      <div className="navbar__links">
        <div onClick={signOutUser} className="navbar__links__item">
          <Link className="navbar__link" to={!user && "/login"}>
            <span className="smaller__link">{`Hello ${
              user ? user.email : "Guest"
            }`}</span>
            <span className="bigger__link">{`${
              user ? "Sign Out" : "Sign In"
            }`}</span>
          </Link>
        </div>
        <div className="navbar__links__item">
          <Link className="navbar__link" to="/orders">
            <span className="smaller__link">Returns</span>
            <span className="bigger__link">& Orders</span>
          </Link>
        </div>
        <div className="navbar__links__item">
          <span className="smaller__link">Your</span>
          <span className="bigger__link">Prime</span>
        </div>
        <div className="navbar__links_cart">
          <Link className="navbar__link__cart" to="/checkout">
            <ShoppingBasketIcon />
            <span>{basket.length}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
