import React, { useEffect, useState } from "react";

import { Image } from "react-bootstrap";

import { db } from "../../firebase";

import { useAuth } from "./../../contexts/AuthContext";
import FollowUserButton from "./FollowUserButton";

import { LinkContainer } from "react-router-bootstrap";
export default function SuggestedUsers() {
  const { currentUser } = useAuth();
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    function getSuggestedUsers() {
      db.users
        .where("uid", "!=", currentUser.uid)
        // .where("followers",'not-in',thisUser.followers)
        .limit(3)
        .get()
        .then((querySnapshot) => {
          let newUsers = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            newUsers.push(data);
          });
          setSuggestedUsers(newUsers);
          setloading(false);
        });
    }
    getSuggestedUsers();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-3   p-1">
        <small className="text-muted">Suggestions for you</small>
      </div>
      {!loading &&
        suggestedUsers.map((user, index) => {
          return (
            <div
              className="d-flex justify-content-between align-items-center  my-3"
              key={index}
            >
              <div className="my-auto">
                <Image
                  src={user.photoUrl}
                  roundedCircle
                  width="30"
                  height="30"
                  className="border mx-2"
                />
                <LinkContainer to={`/user/${user.uid}`}>
                  <small className="text-bold">{user.name}</small>
                </LinkContainer>
              </div>
              <FollowUserButton userId={user.id} />
            </div>
          );
        })}
    </>
  );
}
