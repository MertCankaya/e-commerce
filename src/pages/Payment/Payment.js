import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateValue } from "../../store/AuthContext/authContext";
import { cartActions } from "../../store/cartSlice";
import { uiActions } from "../../store/uiSlice";

import "./Payment.css";
import PaymentProduct from "./PaymentProduct";
import PaymentRight from "./PaymentRight";


const FIREBASE_DOMAIN = "https://e-commerce-e76f2-default-rtdb.firebaseio.com/";


const Payment = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalItem = useSelector((state) => state.cart.totalQuantity);
  const [promotion, setPromotion] = useState("");
  const [promotionOnce, setPromotionOnce] = useState(true);
  const [promotionComponentShow, setPromotionComponentShow] = useState(false);

  const [nameInput, setNameInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [postalCodeInput, setPostalCodeInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  const [shipping, setShipping] = useState("standard");

  const [formValidity, setFormValidity] = useState({
    name: true,
    address: true,
    phone: true,
    postalCode: true,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [{ user }] = useStateValue();
  console.log(user);

  let shippingCount;

  if (shipping === "standard") {
    shippingCount = 0;
  } else {
    shippingCount = 15.99;
  }

  let promotionDiscount;

  if (promotionComponentShow === false) {
    promotionDiscount = 0;
  } else {
    promotionDiscount = 20;
  }

  if (location.pathname === "/subtotal/payment") {
    dispatch(uiActions.openPayment());
  }

  const paymentPromotionHandler = (event) => {
    event.preventDefault();

    if (promotionOnce === true) {
      setPromotionOnce(false);
      if (promotion === "discount15") {
        dispatch(cartActions.promotionDiscount());
        setPromotionComponentShow(true);
      }
    }
    setPromotion("");
  };

  const currentDate = new Date();
  let cargoDate = +currentDate.getDate() + 5;
  let earlyCargoDate = +currentDate.getDate() + 2;
  const productPostDate = currentDate.toLocaleString("default", {
    month: "2-digit",
    year: "numeric",
    day: "numeric",
  });

  let month = currentDate.toLocaleString("default", { month: "long" });

  if (cargoDate === 32) {
    cargoDate = 1;
    month = "January";
  } else if (cargoDate === 33) {
    cargoDate = 2;
    month = "January";
  } else if (cargoDate === 34) {
    cargoDate = 3;
    month = "January";
  } else if (cargoDate === 35) {
    cargoDate = 4;
    month = "January";
  } else if (cargoDate === 36) {
    cargoDate = 5;
    month = "January";
  }

  const getCargoTime = month + " " + cargoDate;
  const getEarlyCargoDate = month + " " + earlyCargoDate;

  let previousPrice;
  let getSelectedTime;
  let totalPriceAfterAddedShippingCost = +totalPrice.toFixed(2);

  if (shipping === "standard") {
    getSelectedTime = getCargoTime;
    previousPrice = (totalPrice + 15).toFixed(2);
  } else if (shipping === "priority") {
    getSelectedTime = getEarlyCargoDate;
    previousPrice = (totalPrice + 30.99).toFixed(2);
    totalPriceAfterAddedShippingCost = +totalPrice.toFixed(2) + 15.99;
  }

  let allItemsPrice;
  if (promotionComponentShow === true) {
    allItemsPrice = (totalPrice + 15).toFixed(2);
  } else {
    allItemsPrice = totalPrice.toFixed(2);
  }

  const isEmpty = (value) => value.trim() === "";

  const paymentOrderSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredName = !isEmpty(nameInput);
    const enteredAddress = !isEmpty(addressInput);
    const enteredPhone = !isEmpty(phoneInput);
    const enteredPostalCode = !isEmpty(postalCodeInput);

    const formIsValid =
      enteredAddress && enteredName && enteredPhone && enteredPostalCode;

    setFormValidity({
      name: enteredName,
      address: enteredAddress,
      phone: enteredPhone,
      postalCode: enteredPostalCode,
    });

    if (formIsValid) {
      if (shipping === "priority") {
        dispatch(cartActions.addShippingCost());
      }
      dispatch(uiActions.openSpinner());
      const postData = await fetch(
        `${FIREBASE_DOMAIN}/products/${user.uid}.json`,
        {
          method: "POST",
          body: JSON.stringify(information),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!postData.ok) {
        alert("Something went wrong");
      }
      dispatch(cartActions.cleanData());
      dispatch(uiActions.closeSpinner());
      navigate("/home", { replace: true });
    }
  };

  const information = {
    email: user.email,
    items: cartItems,
    totalItem: totalItem,
    subtotal: totalPrice,
    totalPrice: totalPriceAfterAddedShippingCost,
    productPostDate: productPostDate,
    shippingInfo: {
      name: nameInput,
      address: addressInput,
      postalCode: postalCodeInput,
      phone: phoneInput,
      shippingType: shipping,
      shippingCount: shippingCount,
    },
    promotion: promotionDiscount,
  };

  return (
    <form className="payment" onSubmit={paymentOrderSubmitHandler}>
      <div className="payment__container">
        <div className="payment__left">
          <h3 className="payment__title">Review your order</h3>
          <div className="payment__left__info">
            <div className="payment__address">
              <h4 className="payment__shippingAdress">Shipping address</h4>
              <section className="payment__form">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    className={!formValidity.name && "payment__invalid"}
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={nameInput}
                    onChange={(event) => setNameInput(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="address">Address</label>
                  <input
                    className={!formValidity.address && "payment__invalid"}
                    type="text"
                    name="address"
                    id="address"
                    required
                    value={addressInput}
                    onChange={(event) => setAddressInput(event.target.value)}
                  />
                </div>
                <div>
                  <label className="postalCode" htmlFor="postalCode">
                    Posta Code
                  </label>
                  <input
                    className={`payment__form__hiddenArrow  ${
                      !formValidity.postalCode && "payment__invalid"
                    }`}
                    type="number"
                    name="postalCode"
                    id="postalCode"
                    required
                    value={postalCodeInput}
                    onChange={(event) => setPostalCodeInput(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="phone">Phone</label>
                  <input
                    className={`payment__form__hiddenArrow  ${
                      !formValidity.phone && "payment__invalid"
                    }`}
                    type="number"
                    name="phone"
                    id="phone"
                    required
                    value={phoneInput}
                    onChange={(event) => setPhoneInput(event.target.value)}
                  />
                </div>
              </section>
            </div>
            <div className="payment__promotion">
              <div>
                <div className="payment__promotion__info">
                  <p>promotion code</p>
                  <input
                    type="text"
                    value={promotion}
                    onChange={(event) => setPromotion(event.target.value)}
                  />
                </div>
                <button
                  className="payment__promotionButton"
                  onClick={paymentPromotionHandler}
                >
                  Add promotion
                </button>
              </div>
            </div>
          </div>
          <div className="payment__product">
            <div>
              <h4 className="payment__product__delivery">
                Delivery: {getSelectedTime}
              </h4>
              <div>
                {cartItems.map((item) => (
                  <PaymentProduct
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </div>
            <div className="payment__delivery__option">
              <h4>Choose a delivery option:</h4>
              <div className="payment__delivery__form">
                <div>
                  <input
                    type="radio"
                    id="standard"
                    name="shippingType"
                    value="standard"
                    defaultChecked
                    onChange={(event) => setShipping(event.target.value)}
                  />
                  <label for="standard">
                    Monday, {getCargoTime} <span>$0.00 Standard Shipping</span>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="priority"
                    name="shippingType"
                    value="priority"
                    onChange={(event) => setShipping(event.target.value)}
                  />
                   
                  <label for="priority">
                    Friday, {getEarlyCargoDate}{" "}
                    <span>$15.99 Priority Shipping</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentRight
        paymentOrderSubmitHandler={paymentOrderSubmitHandler}
        totalItem={totalItem}
        allItemsPrice={allItemsPrice}
        shipping={shipping}
        promotionComponentShow={promotionComponentShow}
        previousPrice={previousPrice}
        totalPriceAfterAddedShippingCost={totalPriceAfterAddedShippingCost}
      />
    </form>
  );
};

export default Payment;
