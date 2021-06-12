import { React, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/Login.css";
import { auth } from "../firebase";

const Login = () => {
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const history = useHistory();
  const [errors, setErrors] = useState(null);

  const loginUser = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(emailRef.current.value, passRef.current.value)
      .then((user) => {
        console.log(user);
        history.push("/");
      })
      .catch((err) => {
        setErrors(err.message);
      });
  };
  return (
    <div className="login">
      <img
        className="login__logo"
        src="https://i.pinimg.com/originals/31/d1/3c/31d13c99ee841869ca44ef54ba956272.png"
        alt="amazon-logo"
      />
      <div className="login__form">
        <div className={`login__form__messages ${errors && "errors_active"}`}>
          {errors}
        </div>
        <h2 className="login__form__header">Sign-In</h2>
        <form>
          <div className="login__form__item">
            <label htmlFor="email">Email (phone for mobile accounts)</label>
            <input ref={emailRef} type="text" id="email" />
          </div>
          <div className="login__form__item">
            <label htmlFor="password">Password</label>
            <input ref={passRef} type="password" id="password" />
          </div>
          <button onClick={loginUser} className="login__form__loginBtn">
            Sign-In
          </button>
        </form>
        <p className="login__form__conditions">
          By continuing you agree to Amazon's Conditions of Use and Privacy
          Notice.
        </p>
        <h2 className="login__form__registerInfo">
          <span>New to Amazon?</span>
        </h2>
        <Link to="/register">
          <button className="login__form__registerBtn">
            Create your Amazon account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
