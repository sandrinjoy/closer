import React from "react";

import { MdDelete } from "react-icons/md";
import { increment } from "firebase/firestore";
import { Button } from "react-bootstrap";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
export default function DeleteButton({ postId }) {
  const { currentUser } = useAuth();
  function handleDelete(e) {
    e.preventDefault();

    db.posts.doc(postId).delete();
    db.users.doc(currentUser.uid).set(
      {
        postsCount: increment(-1),
      },
      { merge: true }
    );
  }

  return (
    <>
      <Button
        variant="outline-danger"
        onClick={handleDelete}
        className=" border-0  d-flex justify-content-center align-items-center"
      >
        <MdDelete /> <span className="px-2">Delete</span>
      </Button>
    </>
  );
}
