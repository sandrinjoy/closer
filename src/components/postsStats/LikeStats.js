import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { Image, Button, Modal } from "react-bootstrap";
import FollowUserButton from "../feed/FollowUserButton";

import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
export default function LikeStats(props) {
  //props -> children , postId
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usersDetails, setUsersDetails] = useState([]);
  const { currentUser } = useAuth();
  function fetchUsers() {
    setLoading(true);
    db.posts
      .doc(props.postId)
      .get()
      .then((q) => {
        const data = q.data();

        return data.likesBy;
      })
      .then((users) => {
        const newUsersDetails = [];
        if (users) {
          users.forEach((user) => {
            db.users
              .doc(user)
              .get()
              .then((q) => {
                const data = q.data();
                newUsersDetails.push(data);
              });
          });
        }
        setUsersDetails(newUsersDetails);
        setLoading(false);
      });
  }
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }
  useEffect(() => {
    closeModal();
    fetchUsers();
  }, [props.posts]);
  return (
    <>
      <Button onClick={openModal} variant="">
        <small className="text-muted "> {props.children} </small>
      </Button>
      <Modal show={open} onHide={closeModal} centered>
        <Modal.Body>
          {!loading &&
            usersDetails.map((x, index) => {
              return (
                <div
                  key={index}
                  className="d-flex align-items-center justify-content-between"
                >
                  <div className="px-2 my-1">
                    {currentUser.uid !== x.uid ? (
                      <LinkContainer to={`/user/${x.uid}`}>
                        <small>
                          <Image
                            src={x.photoUrl}
                            width="30"
                            height="30"
                            roundedCircle
                            className="border"
                          />{" "}
                          {x.name}
                        </small>
                      </LinkContainer>
                    ) : (
                      <LinkContainer to="/user">
                        <small>
                          <Image
                            src={x.photoUrl}
                            width="30"
                            height="30"
                            roundedCircle
                            className="border"
                          />{" "}
                          {x.name}
                        </small>
                      </LinkContainer>
                    )}
                  </div>
                  <div>
                    {currentUser.uid !== x.uid ? (
                      <FollowUserButton userId={x.uid} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
        </Modal.Body>
      </Modal>
    </>
  );
}
