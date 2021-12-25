import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStateValue } from "../../../store/AuthContext/authContext";
import { orderActions } from "../../../store/orderSlice";
import OrderDetail from "./OrderDetail";


import "./OrdersDetail.css";

const FIREBASE_DOMAIN = "https://e-commerce-e76f2-default-rtdb.firebaseio.com/";




const OrdersDetail = () => {
  const [{ user }] = useStateValue();
  const dispatch = useDispatch();

  const ordersDetail = useSelector((state) => state.order.orders);

  useEffect(() => {
    const fetchProductDate = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/products.json`);

      if (!response.ok) {
        throw new Error("Product fetch failed!");
      }

      const data = await response.json();

      const transformedProduct = [];

      for (const key in data) {
        if (key === user.uid) {
          const products = data[key];
          for (const product in products) {
            const productDetailObj = {
              productId: product,
              items: products[product].items,
              totalPrice: products[product].totalPrice,
              shippingInfo: products[product].shippingInfo,
              productPostDate: products[product].productPostDate,
              totalItem: products[product].totalItem,
              promotion: products[product].promotion,
              subtotal: products[product].subtotal,
            };

            transformedProduct.push(productDetailObj);
          }
        }
      }
      const sortedTransformedProduct = transformedProduct.sort((a, b) =>
        a > b ? 1 : -1
      );
      dispatch(orderActions.replaceOrder(sortedTransformedProduct));
    };
    fetchProductDate();
  }, [user.uid, dispatch]);
  return (
    <div className="orders__detail">
      <div className="orders__container">
        <div className="orders__container__wrapper">
          <h2 className="orders__container__title">Your Orders</h2>
          <div className="orders__detail">
            {ordersDetail.map((item) => (
              <OrderDetail
                productId={item.productId}
                totalItem={item.totalItem}
                productPostDate={item.productPostDate}
                totalPrice={item.totalPrice}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersDetail;
