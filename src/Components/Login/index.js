import React, { useState } from "react";
import LogoLogin from "../../assets/logo/logo_bwfix.svg";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { auth } from "../../firebase";

const Login = () => {
  const history = useHistory();
  //   const { email, setEmail } = useState("");
  //   const { password, setPassword } = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const signIn = (e) => {
    //sign in without reload app
    e.preventDefault();

    //some fancy firebase login
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((auth) => {
        history.push("/");
      });
  };

  const register = (e) => {
    //sign in without reload app
    e.preventDefault();

    //some fancy firebase register
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((auth) => {
        //if success and psuh to home page "/" with useHistory
        console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img className="login__logo" src={LogoLogin} alt="logo" />
      </Link>

      <div className="login__container">
        <h1>Sign In</h1>

        <form>
          <h5>Email</h5>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            // onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            // value={values.password}
            // onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login__signInButton"
            type="submit"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to MS Store Condition od Use & Sale. Please
          see our Privacy Notice, our Cookies Notice and our Interest-Based Ads
          Notice
        </p>

        <button
          className="login__registerButton"
          type="submit"
          onClick={register}
        >
          Create your Account
        </button>
      </div>
    </div>
  );
};

export default Login;
