import React from "react";
import "./PaymentProduct.css";

const PaymentProduct = ({ image, title, price, quantity }) => {
  return (
    <div className="paymentProduct">
      <div className="paymentProduct__container">
        <img src={image} alt={title} />
        <div className="paymentProduct__info">
          <h3 className="paymentProduct__info__title">{title}</h3>
          <h4>${price}</h4>
          <h3>Quantity:{quantity}</h3>
        </div>
      </div>
    </div>
  );
};

export default PaymentProduct;
