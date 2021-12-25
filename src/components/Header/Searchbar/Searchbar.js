import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiActions } from "../../../store/productApiSlice";

import SearchIcon from "../../../assets/searchIcon.png";
import "./Searchbar.css";

const Searchbar = () => {
  const navigate = useNavigate();

  const apiKeyword = useSelector((state) => state.productApi.keyword);
  const dispatch = useDispatch();

  const [onFocusClass, setOnFocusClass] = useState(false);

  const onFocusHandler = () => {
    setOnFocusClass(true);
  };

  const onBlurHandler = () => {
    setOnFocusClass(false);
  };

  const searchSubmitHandler = (event) => {
    event.preventDefault();

    dispatch(apiActions.startApiProcess());
    navigate(`/${apiKeyword}`);
  };

  return (
    <div>
      <form onSubmit={searchSubmitHandler}>
        <div
          className={
            onFocusClass ? "searchBar__search__onFocus" : "searchbar__search"
          }
        >
          <input
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            className="searchbar__input"
            value={apiKeyword}
            onChange={(event) =>
              dispatch(apiActions.apiKeyword(event.target.value))
            }
          />
          <button className="searchbar__button" onClick={searchSubmitHandler}>
            <img
              className="searchbar__buttonImage"
              src={SearchIcon}
              alt="SearchIcon"
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
