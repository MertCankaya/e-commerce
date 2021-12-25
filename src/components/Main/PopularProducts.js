import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { apiActions } from "../../store/productApiSlice";
import { uiActions } from "../../store/uiSlice";
import PopularProduct from "./PopularProduct";
import "./PopularProducts.css";

const APIKEY = process.env.REACT_APP_API_KEY;

const popularProductData = [
  {
    id: 0,
    title: "Redragon Gaming Keyboard & Mouse Combo",
    image:
      "https://media.kohlsimg.com/is/image/kohls/4300306?wid=180&hei=180&op_sharpen=1",
    price: 39.99,
    webID: "4300306",
  },
  {
    id: 1,
    title: "Redragon K582 SURARA RGB Backlit Gaming Keyboard",
    image:
      "https://media.kohlsimg.com/is/image/kohls/4300298?wid=180&hei=180&op_sharpen=1",
    price: 59.99,
    webID: "4300298",
  },
  {
    id: 2,
    title: "Adesso Tru-Form 150 - 3-Color Illuminated Ergonomic Keyboard",
    image:
      "https://media.kohlsimg.com/is/image/kohls/4657448?wid=180&hei=180&op_sharpen=1",
    price: 49.99,
    webID: "4657448",
  },
  {
    id: 3,
    title: "Verbatim Slimline Corded USB Keyboard",
    image:
      "https://media.kohlsimg.com/is/image/kohls/4650265?wid=180&hei=180&op_sharpen=1",
    price: 10.99,
    webID: "4650265",
  },
  {
    id: 4,
    title: "Verbatim Slimline Corded USB Keyboard & Mouse",
    image:
      "https://media.kohlsimg.com/is/image/kohls/4650259?wid=180&hei=180&op_sharpen=1",
    price: 17.99,
    webID: "4650259",
  },
  {
    id: 5,
    title: "Redragon K552 KUMARA Backlit Gaming Keyboard",
    image:
      "https://media.kohlsimg.com/is/image/kohls/4300299?wid=180&hei=180&op_sharpen=1",
    price: 44.99,
    webID: "4300299",
  },
];

const PopularProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const linkProductLogic = async (productCategory, productID) => {
    dispatch(uiActions.openSpinner());
    try {
      const response = await fetch(
        "https://kohls.p.rapidapi.com/products/list?limit=6&offset=1&keyword=keyboard",
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
      console.log(apiDataObj);
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
  return (
    <div className="popularProducts">
      <h2>Popular sellers in Keyboards</h2>
      <div className="popularProducts__data">
        {popularProductData.map((data) => (
          <PopularProduct
            key={data.id}
            webID={data.webID}
            title={data.title}
            price={data.price}
            image={data.image}
            onLinkProductLogic={linkProductLogic}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
