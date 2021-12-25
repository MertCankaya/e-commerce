import React from "react";
import "./Comment.css";

const Comment = ({ name, message }) => {
  return (
    <div className="comment">
      <div className="comment__container">
        <div className="comment__info">
          <h4 className="comment__name">{name}</h4>
          <h2 className="comment__message">{message}</h2>
        </div>
      </div>
    </div>
  );
};

export default Comment;
