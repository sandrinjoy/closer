import React, { useRef, useState } from "react";
import { Spinner, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
import { photodb, db } from "../../firebase";
export default function UpdateProfile() {
  const nameRef = useRef();
  const passwordRef = useRef();
  const { currentUser, updateProfile, writeUserData } = useAuth();
  const [name, setName] = useState(currentUser.displayName);

  const [error, setError] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [noFile, setNoFile] = useState(true);

  const onPhotoChange = (e) => {
    setUploadLoading(true);
    const file = e.target.files[0];
    var d = new Date();
    var n = d.getTime();
    var wkwk = n + currentUser.uid + file.name;

    const fileRef = photodb.ref("/propic").child(wkwk);
    var uploadTask = fileRef.put(file);
    uploadTask.on(
      "state_changed",
      () => {},
      () => {
        // Handle unsuccessful uploads
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setNoFile(false);
          setUploadLoading(false);
          setTempUrl(downloadURL);
        });
      }
    );
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (nameRef.current.value == "") {
      return setError("Name shouldn't be Blank");
    }
    setLoading(true);
    setError("");
    updateProfile(nameRef.current.value, tempUrl)
      .then(() => {
        let tuser = writeUserData(currentUser);
        console.log(tuser);
        db.createUser(currentUser.uid, tuser);

        /*    history.push("/")*/
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <CenteredContainer>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className=" mb-4">Hi {name}, </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="name" className="mb-3">
                <Form.Label>What can we call you ?</Form.Label>
                <Form.Control
                  type="text"
                  ref={nameRef}
                  onChange={(e) => setName(e.currentTarget.value)}
                  required
                  defaultValue=""
                  placeholder="Your Name"
                />
              </Form.Group>
              <hr />
              <Form.Group id="photo Upload" className="mt-4 mb-1">
                <Form.Label>Profile Photo</Form.Label>
                <Form.Control
                  type="file"
                  ref={passwordRef}
                  placeholder="New Password"
                  onChange={onPhotoChange}
                  required
                />
                {uploadLoading && (
                  <Button variant="primary" className="my-2 w-100" disabled>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="mx-2"> Uploading</span>
                  </Button>
                )}
              </Form.Group>
              <hr />
              <small className="text-secondary">
                Note : Closer is an Open Community Platform. Your Name and Photo
                will be public to Everyone
              </small>
              {!loading && (
                <Button disabled={noFile} className="w-100 mt-3" type="submit">
                  Save
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <Link to="/user">Cancel</Link>
        </div>
      </div>
    </CenteredContainer>
  );
}
