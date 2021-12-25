import React from "react";
import { Link } from "react-router-dom";

import "./Product.css";


const Product = ({ title, image, price, webID }) => {
  return (
    <div className="product">
      <Link className="product__link" to={webID}>
        <div className="product__container">
          <img className="product__image" src={image} alt={title} />
          <div className="product__info">
            <h3>{title}</h3>
            <h3 className="product__price">${price}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;

