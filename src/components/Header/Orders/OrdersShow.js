import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import OrderShow from "./OrderShow";
import "./OrdersShow.css";

const OrdersShow = () => {
  const location = useLocation();
  const ordersDetail = useSelector((state) => state.order.orders);
  const orderId = location.pathname.slice(8);

  const foundItem = ordersDetail.find((item) => item.productId === orderId);
  const orderedItems = foundItem.items;
  const shippingInfo = foundItem.shippingInfo;

  return (
    <div>
      <div className="ordersShow__container">
        <h2 className="ordersShow__orderDetails__title">Order Details</h2>
        <div className="ordersShow__detail">
          <div className="ordersShow__detail__left">
            <div className="ordersShow__detail__left__info">
              <h3>Name: {shippingInfo.name}</h3>
              <h4>
                <span>Phone:</span> {shippingInfo.phone}
              </h4>
              <h4>
                <span>Postal Code:</span> {shippingInfo.postalCode}
              </h4>

              <h4 className="ordersShow__detail__left__info__address">
                <span>Address:</span> {shippingInfo.address}
              </h4>
            </div>
          </div>
          <div className="ordersShow__detail__right">
            <h3>Order Summary</h3>
            <div>
              <h3 className="ordersShow__detail__right__subtotal">
                Item(s) Subtotal:
              </h3>
              <h3>${foundItem.subtotal.toFixed(2)}</h3>
            </div>
            <div>
              <h3 className="ordersShow__detail__right__subtotal">
                Total Items:
              </h3>
              <h3>{foundItem.totalItem}</h3>
            </div>
            <div>
              <h3 className="ordersShow__detail__right__subtotal">Shipping:</h3>
              <h3>${foundItem.shippingInfo.shippingCount}</h3>
            </div>
            <div>
              <h3 className="ordersShow__detail__right__subtotal">
                Promotion:
              </h3>
              <h3>${foundItem.promotion}</h3>
            </div>
            <div className="ordersShow__detail__right__subtotal">
              <h2>Total:</h2>
              <h2>${foundItem.totalPrice.toFixed(2)}</h2>
            </div>
          </div>
        </div>
        <div className="ordersShow__product">
          <h3>Ordered Time: {foundItem.productPostDate}</h3>
          {orderedItems.map((order) => (
            <OrderShow
              image={order.image}
              price={order.price}
              quantity={order.quantity}
              title={order.title}
              totalPrice={order.totalPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersShow;
