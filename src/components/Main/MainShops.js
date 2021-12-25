import React from "react";
import { useNavigate } from "react-router-dom";
import MainShop from "./MainShop";

import "./MainShops.css";
import { apiActions } from "../../store/productApiSlice";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/uiSlice";

const APIKEY = process.env.REACT_APP_API_KEY;

const MainShops = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productListHandler = async (productCategory) => {
    dispatch(uiActions.openSpinner());
    try {
      const response = await fetch(
        `https://kohls.p.rapidapi.com/products/list?limit=24&offset=1&keyword=${productCategory}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "kohls.p.rapidapi.com",
            "x-rapidapi-key": APIKEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Fetching data failed!");
      }

      const data = await response.json();
      const formedData = data.payload.products || [];
      const apiDataObj = formedData.map((data, index) => {
        return {
          id: index,
          title: data.productTitle,
          image: data.image.url,
          price: data.prices[0].regularPrice.minPrice,
          webID: data.webID,
          rating: data.rating.avgRating,
        };
      });

      dispatch(
        apiActions.apiData({
          items: apiDataObj,
        })
      );
      dispatch(uiActions.closeSpinner());
      navigate(`/${productCategory}`);
    } catch (error) {
      alert(error);
    }
  };

  const productListOne = () => {
    productListHandler("keyboard");
  };

  const productListTwo = () => {
    productListHandler("headphone");
  };

  const productListThree = () => {
    productListHandler("kitchen");
  };

  const productListFour = () => {
    productListHandler("shoe");
  };

  return (
    <div className="mainShops">
      <div className="mainShops__container">
        <MainShop
          mainTitle="Keyboards"
          image="https://media.kohlsimg.com/is/image/kohls/4300298?wid=180&hei=180&op_sharpen=1"
          onListHandler={productListOne}
        />
        <MainShop
          mainTitle="Headphones"
          image="https://media.kohlsimg.com/is/image/kohls/3996548_Black?wid=180&hei=180&op_sharpen=1"
          onListHandler={productListTwo}
        />
        <MainShop
          mainTitle="Kitchen"
          image="https://media.kohlsimg.com/is/image/kohls/5413509?wid=180&hei=180&op_sharpen=1"
          onListHandler={productListThree}
        />
        <MainShop
          mainTitle="Shoes"
          image="https://media.kohlsimg.com/is/image/kohls/2958262_Black_White?wid=180&hei=180&op_sharpen=1"
          onListHandler={productListFour}
        />
      </div>
    </div>
  );
};

export default MainShops;
