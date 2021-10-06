import React, { useRef, useState } from "react";
import logo from "../../logo.svg";
import { Alert, Image, Form, Card, Button, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";
export default function Register() {
  const emailRef = useRef();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match ");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/update-user");
    } catch {
      setLoading(false);
      setError("Failed to create an account");
    }
  }
  return (
    <CenteredContainer>
      <div className=" rounded  p-5 d-none  d-md-flex flex-column justify-content-center">
        <Image src={logo} style={{ width: "10vh" }} />
        <h1 className="display-4">Closer Community</h1>
        <h4>Together, forever . ❤️</h4>
      </div>

      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <div className="   p-3   d-flex flex-column align-items-center     d-md-none  justify-content-center">
            <Image src={logo} style={{ width: "10vh" }} />

            <h1 className="text-center display-4">Closer Community</h1>
          </div>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email" className="mb-2">
                <Form.Control
                  type="email"
                  placeholder="email address"
                  ref={emailRef}
                  required
                />
              </Form.Group>
              <Form.Group id="username" className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="username"
                  ref={usernameRef}
                  required
                />
              </Form.Group>
              <Form.Group id="password" className="mb-2">
                <Form.Control
                  type="password"
                  placeholder="password"
                  ref={passwordRef}
                  required
                />
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-2">
                <Form.Control
                  type="password"
                  placeholder="re-enter the password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              {!loading && (
                <Button disabled={loading} className="w-100 mt-4" type="submit">
                  Sign Up
                </Button>
              )}
              {loading && (
                <Button variant="primary" disabled className="w-100 mt-4">
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  &nbsp;Signing Up
                </Button>
              )}
            </Form>
            <Card.Text className="mt-2 text-center px-5">
              <small>
                By signing up, you agree to our Terms , Data Policy and Cookies
                Policy .
              </small>
            </Card.Text>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <LinkContainer to="/login">
            <Button variant="nav-link" type="submit" className="btn-sm w-100  ">
              Already have an Account ?{" "}
              <span className="text-primary"> Sign In</span>
            </Button>
          </LinkContainer>
        </div>
      </div>
    </CenteredContainer>
  );
}
