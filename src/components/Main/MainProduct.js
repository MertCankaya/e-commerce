import React from "react";
import Card from "../UI/Card";

const MainProduct = ({ mainTitle, title, image, onProductHandler }) => {
  return (
    <Card>
      <button onClick={onProductHandler}>
        <h2>{mainTitle}</h2>
        <img src={image} alt={title} />
        <h4>{title}</h4>
      </button>
    </Card>
  );
};

export default MainProduct;
