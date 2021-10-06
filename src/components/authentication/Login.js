import React, { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { FaLockOpen } from "react-icons/fa";
import logo from "../../logo.svg";
import {
  Alert,
  Image,
  Form,
  Card,
  Button,
  ButtonGroup,
  Spinner,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import CenteredContainer from "./CenteredContainer";
export default function Login() {
  const emailRef = useRef();

  const passwordRef = useRef();
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, login } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (err) {
      setLoading(false);
      setError("Failed to Sign In");
    }
  }
  async function googleLogin() {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      history.push("/");
    } catch {
      setLoading(false);
      setError("Failed to Sign In");
    }
  }
  async function testLogin() {
    try {
      setError("");
      setLoading(true);
      await login("test@test.com", "test123");
      history.push("/");
    } catch (err) {
      setLoading(false);
      setError("Failed to Sign In");
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

              <Form.Group id="password" className="mb-2">
                <Form.Control
                  type="password"
                  placeholder="password"
                  ref={passwordRef}
                  required
                />
              </Form.Group>

              {!loading && (
                <Button className="w-100 mt-4" type="submit">
                  Log In
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
                  &nbsp;Signing In
                </Button>
              )}
            </Form>
            <div className="w-100 text-center mt-2">
              <LinkContainer to="/forgot-password">
                <Button variant="nav-link" type="submit" className="btn-sm   ">
                  <span className="text-primary"> Forgot password ?</span>
                </Button>
              </LinkContainer>
            </div>
            <div className="hrtext text-secondary my-2">or</div>
            <ButtonGroup vertical className="w-100 p-3">
              <Button
                onClick={googleLogin}
                variant="outline-danger"
                type="submit"
                className=" my-1  rounded"
                style={{ fontWeight: "bold" }}
              >
                <FcGoogle /> Sign In with Google
              </Button>
              <Button
                onClick={testLogin}
                variant="outline-secondary"
                type="submit"
                className=" my-1  rounded"
                style={{ fontWeight: "bold" }}
              >
                <FaLockOpen /> Sign In with Test Credentials
              </Button>
            </ButtonGroup>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          <LinkContainer to="/signup">
            <Button variant="nav-link" type="submit" className="btn-sm  ">
              Don`&apos;`t have an Account ?{" "}
              <span className="text-primary"> Sign Up</span>
            </Button>
          </LinkContainer>
        </div>
      </div>
    </CenteredContainer>
  );
}
