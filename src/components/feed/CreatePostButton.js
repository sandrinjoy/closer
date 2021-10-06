import React, { useState } from "react";

import { IoCreateOutline } from "react-icons/io5";
import { CloseButton, Button, Form, Modal } from "react-bootstrap";
import { db } from "../../firebase";

import { increment } from "firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
export default function CreatePostButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();
  function handleSubmit(e) {
    e.preventDefault();

    db.posts.add({
      userId: currentUser.uid,
      data: name,
      createdAt: db.getCurrentTimestamp(),
      likesBy: [],
      likeCount: 0,
    });
    db.users.doc(currentUser.uid).set(
      {
        postsCount: increment(1),
      },
      { merge: true }
    );
    setName("");
    closeModal();
  }
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setName("");
    setOpen(false);
  }
  return (
    <>
      <Button
        onClick={openModal}
        variant="outline-danger"
        className="mx-1 d-flex align-items-center"
      >
        <IoCreateOutline /> Post
      </Button>
      <Modal show={open} onHide={closeModal} centered>
        <Form className="p-2" onSubmit={handleSubmit}>
          <CloseButton onClick={closeModal} />
          <hr />
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="What's Happening ?"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="success" type="submit">
                POST
              </Button>
            </Modal.Footer>
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
}
