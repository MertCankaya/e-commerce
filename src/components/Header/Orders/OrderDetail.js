import React from "react";
import { Link } from "react-router-dom";
import "./OrderDetail.css";

const OrderDetail = ({ totalItem, productPostDate, productId, totalPrice }) => {
  return (
    <Link to={`/orders/${productId}`} className="orderDetail">
      <div className="orderDetail__container">
        <div className="orderDetail__left">
          <h3>{productPostDate}</h3>
          <h3>Total Product: {totalItem}</h3>
        </div>
        <h3 className="orderDetail__totalPrice">${totalPrice.toFixed(2)}</h3>
      </div>
    </Link>
  );
};

export default OrderDetail;