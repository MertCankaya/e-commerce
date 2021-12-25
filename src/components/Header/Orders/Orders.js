import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../../../store/AuthContext/authContext";
import "./Orders.css";

const Orders = () => {
  const [{ user }] = useStateValue();
  return (
    <Link className="orders__link" to={!user ? "/login" : "/orders"}>
      Orders
    </Link>
  );
};

export default Orders;
