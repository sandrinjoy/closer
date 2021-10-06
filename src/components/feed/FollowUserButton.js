import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";

import { arrayUnion, arrayRemove, increment } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
export default function FollowUserButton({ userId }) {
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    db.users
      .doc(currentUser.uid)
      .get()
      .then((q) => {
        const data = q.data();
        if (data.following) {
          if (data.following.includes(userId)) {
            setFollowed(true);
          } else setFollowed(false);
        }
        setLoading(false);
      });
  });
  const { currentUser } = useAuth();
  function handleFollow(e) {
    e.preventDefault();
    if (!followed) {
      db.users.doc(currentUser.uid).set(
        {
          following: arrayUnion(userId),
          followingCount: increment(1),
        },
        { merge: true }
      );
      db.users.doc(userId).set(
        {
          followers: arrayUnion(currentUser.uid),
          followersCount: increment(1),
        },
        { merge: true }
      );
    } else {
      db.users.doc(currentUser.uid).set(
        {
          following: arrayRemove(userId),
          followingCount: increment(-1),
        },
        { merge: true }
      );
      db.users.doc(userId).set(
        {
          followers: arrayRemove(currentUser.uid),
          followersCount: increment(-1),
        },
        { merge: true }
      );
    }
    setFollowed(!followed);
  }

  return (
    <>
      {!loading && (
        <Button
          onClick={handleFollow}
          variant=""
          className={`btn-sm ${
            followed ? " text-dark " : " text-primary "
          } text-bold border`}
        >
          {followed ? "following" : "follow"}
        </Button>
      )}
    </>
  );
}
