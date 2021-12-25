import React from "react";
import { useNavigate } from "react-router";
import { useStateValue } from "../../../store/AuthContext/authContext";
import { actionTypes } from "../../../store/AuthContext/reducer";
import "./Account.css";

const Account = () => {
  const [{ user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const buttonHandler = () => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch({
        type: actionTypes.DROP_USER,
      });
    }
  };

  return (
    <>
      <button to="/login" className="account" onClick={buttonHandler}>
        {!user && <p className="account__login">Login</p>}
        {user && <p className="account__userName">{user.displayName}</p>}
      </button>
    </>
  );
};

export default Account;
