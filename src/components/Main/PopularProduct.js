import React from "react";
import "./PopularProduct.css";

const PopularProduct = ({
  title,
  price,
  description,
  image,
  webID,
  onLinkProductLogic,
}) => {
  const popularProductHandler = () => {
    onLinkProductLogic("keyboard", webID);
  };
  return (
    <button onClick={popularProductHandler} className="popularProduct__button">
      <div>
        <img src={image} alt={description} className="popularProduct__image" />
      </div>
      <h4 className="popularProduct__title">{title}</h4>
      <h3 className="popularProduct__price">{price} $</h3>
    </button>
  );
};

export default PopularProduct;
