import { Image, Navbar, Container, Nav } from "react-bootstrap";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import CreatePostButton from "./feed/CreatePostButton";
import logo from "../logo.svg";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
function MyNavbar() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch {
      console.log("failed");
    }
  }
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        className="bg-white sticky-top border-bottom"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Closer
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/user">
                <Nav.Link>
                  {" "}
                  <Image
                    alt=""
                    src={currentUser.photoURL}
                    width="30"
                    height="30"
                    roundedCircle
                    className="border"
                  />{" "}
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <CreatePostButton />

              <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
