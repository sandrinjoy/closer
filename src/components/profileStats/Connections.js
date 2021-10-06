import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { Image, Button, Modal } from "react-bootstrap";
import FollowUserButton from "../feed/FollowUserButton";

import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
export default function Connections(props) {
  //props -> children , userId ,connection(followers,following)
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usersDetails, setUsersDetails] = useState([]);
  const { currentUser } = useAuth();
  function fetchUsers(connection) {
    setLoading(true);
    db.users
      .doc(props.userId)
      .get()
      .then((q) => {
        const data = q.data();

        return connection === "followers" ? data.followers : data.following;
      })
      .then((users) => {
        console.log(users);
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
    fetchUsers(props.connection);
  }, [props.userId]);
  return (
    <>
      <Button onClick={openModal} variant="">
        {props.children}
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
