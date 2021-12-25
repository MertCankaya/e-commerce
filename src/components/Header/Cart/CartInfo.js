import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";
import "./CartInfo.css";

const CartInfo = ({ item }) => {
  const dispatch = useDispatch();

  const addItemToCart = () => {
    dispatch(
      cartActions.addItemToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      })
    );
  };

  const removeItemFromCart = () => {
    dispatch(cartActions.removeItemFromCart(item.id));
  };

  return (
    <div className="cartInfo">
      <div className="cartInfo__container">
        <div className="cartInfo__left">
          <img className="cartInfo__image" src={item.image} alt={item.title} />
          <div className="cartInfo__info">
            <div className="cartInfo__info__left">
              <h3>{item.title}</h3>
              <h4>Quantity: {item.quantity}</h4>
            </div>
            <h3>${item.price}</h3>
            <div className="cartInfo__buttons">
              <button onClick={removeItemFromCart}>-</button>
              <button onClick={addItemToCart}>+</button>
            </div>
          </div>
        </div>
        <h2 className="cartInfo__totalPrice">${item.total.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default CartInfo;
