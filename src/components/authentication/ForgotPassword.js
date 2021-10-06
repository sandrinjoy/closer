import React, { useRef, useState } from "react";
import logo from "../../logo.svg";
import { Alert, Image, Form, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import CenteredContainer from "./CenteredContainer";
export default function ForgotPassword() {
  const emailRef = useRef();

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { resetPassword } = useAuth();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      await resetPassword(emailRef.current.value);
      setMessage("Check-in your inbox for further instructions");
    } catch (err) {
      setError("Failed to reset password");
    }
  }

  return (
    <CenteredContainer>
      <div className=" rounded  p-5 d-none  d-md-flex flex-column justify-content-center">
        <Image src={logo} style={{ width: "10vh" }} />
        <h1>Closer Community</h1>
        <h4>Together, forever . ❤️</h4>
      </div>

      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <div className="   p-3   d-flex flex-column align-items-center     d-md-none  justify-content-center">
            <Image src={logo} style={{ width: "10vh" }} />

            <h1 className="text-center">Closer Community</h1>
          </div>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-2">
                <Form.Control
                  type="email"
                  placeholder="email address"
                  ref={emailRef}
                  required
                />
              </Form.Group>

              <Button className="w-100 mt-4" type="submit">
                Reset Password
              </Button>
            </Form>
            <div className="hrtext text-secondary my-2">or</div>
            <div className="w-100 text-center mt-2">
              <LinkContainer to="/signup">
                <Button variant="nav-link" type="submit" className="btn-sm   ">
                  <span className="text-primary"> Create New Account </span>
                </Button>
              </LinkContainer>
            </div>
          </Card.Body>
          <div className="w-100 text-center">
            <LinkContainer to="/login">
              <Button
                variant="nav-link"
                type="submit"
                className=" w-100  border-top text-secondary"
              >
                Back to Login Page
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </div>
    </CenteredContainer>
  );
}
