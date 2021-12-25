import React from "react";

import { auth, provider } from "../../firebase";

import "./Login.css";
import logo from "../../assets/crown.png";
import googleLogo from "../../assets/google.png";

import { actionTypes } from "../../store/AuthContext/reducer";
import { useStateValue } from "../../store/AuthContext/authContext";
import { useNavigate } from "react-router";

const Login = () => {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const loginButtonHandler = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        navigate("/home", { replace: true });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <div className="login__container">
        <img src={logo} alt="logo" />
        <button onClick={loginButtonHandler}>
          Login with Google
          <span>
            <img
              className="login__googleLogo"
              src={googleLogo}
              alt="Google Logo"
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
