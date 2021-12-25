import React from "react";
import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";

import img1 from "../../assets/carosel1.jpg";
import img2 from "../../assets/carosel2.jpg";
import img3 from "../../assets/carousel.jpg";

const Carousel = () => {
  const style = {
    textAlign: "center",
    fontSize: "30px",
    height: "27.4rem",
    width: "100%",
    borderRadius: "40px 40px 0 0",
    marginTop: "2rem",
   
  };

  return (
    <div>
      <div>
        <Slide autoplay={true}>
          <img src={img1} alt="img1" style={style} />
          <img src={img2} alt="img2" style={style} />
          <img src={img3} alt="img3" style={style} />
        </Slide>
      </div>
    </div>
  );
};

export default Carousel;
