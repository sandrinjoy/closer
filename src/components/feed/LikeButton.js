import React, { useState } from "react";
import { arrayUnion, arrayRemove, increment } from "firebase/firestore";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import LikeStats from "../postsStats/LikeStats";
export default function LikeButton({ userLike, likes, postId, posts }) {
  //userLike , Likes, PostId props
  const [like, setLike] = useState(userLike);
  const { currentUser } = useAuth();
  function handleLike(e) {
    e.preventDefault();
    if (!userLike) {
      db.posts.doc(postId).update({
        likesBy: arrayUnion(currentUser.uid),
        likeCount: increment(1),
      });
    } else {
      db.posts.doc(postId).update({
        likesBy: arrayRemove(currentUser.uid),
        likeCount: increment(-1),
      });
    }
    setLike(!like);
  }

  return (
    <>
      <div className="d-flex  align-items-center justify-content-start">
        <Button
          onClick={handleLike}
          variant=""
          className=" border-0 d-flex  align-items-center "
        >
          {userLike ? (
            <AiFillLike className="text-primary" />
          ) : (
            <AiOutlineLike className="text-primary" />
          )}
        </Button>
        <LikeStats postId={postId} posts={posts}>
          {likes === 0
            ? "Be the First person to like this!"
            : likes === 1
            ? "1 like"
            : likes + " Likes"}
        </LikeStats>
      </div>
    </>
  );
}
