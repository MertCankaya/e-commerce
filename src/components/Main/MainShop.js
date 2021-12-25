import React from "react";
import Card from "../UI/Card";

const MainShop = ({ mainTitle, title, image, onListHandler }) => {
  return (
    <Card>
      <button onClick={onListHandler} style={{  paddingBottom: "3rem" }}>
        <h2>{mainTitle}</h2>
        <img src={image} alt={title} />
      </button>
    </Card>
  );
};

export default MainShop;
