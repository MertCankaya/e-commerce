import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

import "./CartButton.css";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const CartButton = () => {
  const navigate = useNavigate();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const cartButtonHandler = () => {
    navigate("/subtotal");
  };
  return (
    <button className="cartButton" onClick={cartButtonHandler}>
      <div className="cartButton__icon">
        <ShoppingBasketIcon />
      </div>
      <div className="cartButton__score">{cartQuantity}</div>
    </button>
  );
};

export default CartButton;
