import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cartActions } from "../../store/cartSlice";
import Comments from "../../components/Comment/Comments";

import "./ProductDetail.css";

const ProductDetail = () => {
  const apiData = useSelector((state) => state.productApi.apiData);
  const params = useParams();

  const dispatch = useDispatch();

  const data = apiData.find((item) => item.webID === params.product);

 

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: data.webID,
        title: data.title,
        price: data.price,
        image: data.image,
      })
    );
  };

  return (
    <div className="propuctDetail">
      <div className="productDetail__container">
        {data && <img src={data.image} alt={data.title} />}
        <div className="productDetail__info">
          {data && <h1 className="productDetail__title">{data.title}</h1>}
          {data && <h1 className="productDetail__price">${data.price}</h1>}
          {data && (
            <h5 className="productDetail__rating">
              Rating / {data.rating ? data.rating : "There is no rating"}
            </h5>
          )}
          {!data && (
            <p className="productDetail__error">Something went wrong</p>
          )}
          {data && (
            <div className="productDetail__send">
              <button
                className="productDetail__button"
                onClick={addToCartHandler}
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>
      {data && <Comments webID={data.webID} />}
    </div>
  );
};

export default ProductDetail;
