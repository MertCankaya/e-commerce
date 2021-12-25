import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useStateValue } from "../../store/AuthContext/authContext";

import "./AddComment.css";

const FIREBASE_DOMAIN = "https://e-commerce-e76f2-default-rtdb.firebaseio.com/";

const AddComment = ({ webID, fetchCommentHandler }) => {
  const [commentInput, setCommentInput] = useState();
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const commentSubmitHandler = async (event) => {
    event.preventDefault();

    if (user) {
      await fetch(`${FIREBASE_DOMAIN}/comments/${webID}.json`, {
        method: "POST",
        body: JSON.stringify({
          name: user.displayName,
          comment: commentInput,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setCommentInput("");
      fetchCommentHandler();
    } else {
      navigate("/login");
    }
  };

  return (
    <form onSubmit={commentSubmitHandler}>
      <div className="addComment__container">
        <div className="addComment__info">
          <input
            className="addComment__input"
            value={commentInput}
            onChange={(event) => setCommentInput(event.target.value)}
          />
          <button className="addComment__button" onClick={commentSubmitHandler}>
            Add Comment
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddComment;
