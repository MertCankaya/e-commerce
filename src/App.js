import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Cart from "./components/Header/Cart/Cart";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Login from "./pages/Login/Login";
import Payment from "./pages/Payment/Payment";
import ProductDetail from "./pages/Product/ProductDetail";
import Products from "./pages/Product/Products";

import "./App.css";
import { useStateValue } from "./store/AuthContext/authContext";
import OrdersDetail from "./components/Header/Orders/OrdersDetail";
import OrdersShow from "./components/Header/Orders/OrdersShow";
import Spinner from "./components/UI/Spinner";

const App = () => {
  const payment = useSelector((state) => state.ui.payment);
  const productQuantity = useSelector((state) => state.cart.totalQuantity);
  const existSpinner = useSelector((state) => state.ui.spinner);

  const [{ user }, dispatcha] = useStateValue();



  return (
    <>
      {!payment && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={existSpinner ? <Spinner /> : <Main />} />
        <Route
          path="/:products"
          element={existSpinner ? <Spinner /> : <Products />}
        />
        <Route path="/:products/:product" element={<ProductDetail />} />
        <Route
          path="/subtotal"
          element={
            productQuantity === 0 ? (
              <h2 className="App__subtotalMessage">
                Please Add Product to Cart
              </h2>
            ) : (
              <Cart />
            )
          }
        />
        <Route
          path="/subtotal/payment"
          element={
            productQuantity === 0 ? (
              <h2 className="App__subtotalMessage">
                Please Add Product to Cart
              </h2>
            ) : existSpinner ? (
              <Spinner />
            ) : (
              <Payment />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/orders"
          element={user ? <OrdersDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="orders/:ordersDetail"
          element={user ? <OrdersShow /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};
export default App;
