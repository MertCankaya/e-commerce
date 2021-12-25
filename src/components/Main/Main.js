import React from "react";
import Carousel from "./Carousel";
import PopularProducts from "./PopularProducts";

import "./Main.css";
import MainShops from "./MainShops";
import { uiActions } from "../../store/uiSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import MainProducts from "./MainProducts";
import Footer from "../Footer/Footer";

const Main = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  if (location.pathname === "/home") {
    dispatch(uiActions.closePayment());
  }

  return (
    <>
      <div className="main">
        <div className="main__container">
          <Carousel />
          <MainShops />
          <PopularProducts />
          <MainProducts />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
