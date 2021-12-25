import React from "react";
import { useNavigate } from "react-router-dom";

import { apiActions } from "../../store/productApiSlice";
import { useDispatch } from "react-redux";
import MainProduct from "./MainProduct";
import { uiActions } from "../../store/uiSlice";

const APIKEY = process.env.REACT_APP_API_KEY;

const MainProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productHandler = async (productCategory, productID) => {
    dispatch(uiActions.openSpinner());
    try {
      const response = await fetch(
        `https://kohls.p.rapidapi.com/products/list?limit=10&offset=1&keyword=${productCategory}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "kohls.p.rapidapi.com",
            "x-rapidapi-key": APIKEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Could not get product.");
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
      navigate(`/${productCategory}/${productID}`);
    } catch (error) {
      alert(error);
    }
  };

  const productOne = () => {
    productHandler("sweat", "4552010");
  };

  const productTwo = () => {
    productHandler("wallet", "3028377");
  };

  const productThree = () => {
    productHandler("jacket", "4936325");
  };

  const productFour = () => {
    productHandler("adidas", "4484489");
  };

  return (
    <div className="mainShops">
      <div className="mainShops__container">
        <MainProduct
          mainTitle="Sweat"
          image="https://media.kohlsimg.com/is/image/kohls/4552010_Radiant_Navy?wid=180&hei=180&op_sharpen=1"
          title="Big & Tall Lands' End Serious Sweats"
          onProductHandler={productOne}
        />
        <MainProduct
          mainTitle="Wallet"
          image="https://media.kohlsimg.com/is/image/kohls/3028377_Brown?wid=180&hei=180&op_sharpen=1"
          title="Men's Dockers® RFID-Blocking"
          onProductHandler={productTwo}
        />
        <MainProduct
          mainTitle="Jacket"
          image="https://media.kohlsimg.com/is/image/kohls/4936325_Zinnia?wid=180&hei=180&op_sharpen=1"
          title="Boys 4-20 ZeroXposur Thruster"
          onProductHandler={productThree}
        />
        <MainProduct
          mainTitle="Adidas"
          image="https://media.kohlsimg.com/is/image/kohls/4484489_Core_Black_White?wid=180&hei=180&op_sharpen=1"
          title="Adidas Cloudfoam Puremotion"
          onProductHandler={productFour}
        />
      </div>
    </div>
  );
};

export default MainProducts;
