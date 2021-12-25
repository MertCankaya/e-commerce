import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiActions } from "../../store/productApiSlice";
import { uiActions } from "../../store/uiSlice";
import Product from "./Product";

const APIKEY = process.env.REACT_APP_API_KEY;

const Products = () => {
  const keyword = useSelector((state) => state.productApi.keyword);
  const processBoolean = useSelector(
    (state) => state.productApi.fetchApiProcess
  );
  const apiData = useSelector((state) => state.productApi.apiData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(uiActions.openSpinner());
      const response = await fetch(
        `https://kohls.p.rapidapi.com/products/list?limit=24&offset=1&keyword=${keyword}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "kohls.p.rapidapi.com",
            "x-rapidapi-key": APIKEY,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Fetch data failed");
      }
      const data = await response.json();
      dispatch(apiActions.stopApiProcess());
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
      dispatch(uiActions.closeSpinner());
      dispatch(
        apiActions.apiData({
          items: apiDataObj,
        })
      );
    };

    if (processBoolean === true) {
      fetchData().catch((error) => alert(error));
    }
  }, [keyword, processBoolean, dispatch]);

  return (
    <div>
      {apiData.map((data) => (
        <Product
          id={data.id}
          title={data.title}
          image={data.image}
          price={data.price}
          rating={data.rating}
          webID={data.webID}
        />
      ))}
    </div>
  );
};

export default Products;
