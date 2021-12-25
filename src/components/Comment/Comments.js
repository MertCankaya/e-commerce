import React, { useCallback, useEffect, useState } from "react";

import AddComment from "./AddComment";
import Comment from "./Comment";

import "./Comments.css";

const FIREBASE_DOMAIN = "https://e-commerce-e76f2-default-rtdb.firebaseio.com/";

const Comments = ({ webID }) => {
  const [comments, setComments] = useState([]);

  const fetchCommentHandler = useCallback(async () => {
    try {
      const response = await fetch(`${FIREBASE_DOMAIN}/comments/${webID}.json`);

      if (!response.ok) {
        throw new Error("Could not get comments.");
      }

      const responseData = await response.json();
      

      const transformedComments = [];

      for (const key in responseData) {
        const commentObj = {
          id: key,
          comment: responseData[key].comment,
          name: responseData[key].name,
        };

        transformedComments.push(commentObj);
      }
      setComments(transformedComments);
    } catch (error) {
      alert(error)
    }
  }, [webID]);
  comments.sort((a, b) => (a.id > b.id ? -1 : 1));


  useEffect(() => {
    fetchCommentHandler();
  }, [fetchCommentHandler]);

  return (
    <div>
      <div className="comments__container">
        <h2 className="comments__title">Comments</h2>
        <AddComment fetchCommentHandler={fetchCommentHandler} webID={webID} />
        <div>
          {comments.map((comment,index) => (
            <Comment key={index} name={comment.name} message={comment.comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
