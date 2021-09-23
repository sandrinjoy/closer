import { Navbar, Container, Nav, NavDropdown, Col } from "react-bootstrap";

import {LinkContainer} from 'react-router-bootstrap'
function MyNavbar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="fixed-top">
        <Container>
        <LinkContainer to="/">
  <Navbar.Brand>Closer</Navbar.Brand>
  </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <LinkContainer to="/features">
              <Nav.Link >Features</Nav.Link></LinkContainer>
             
            </Nav>
            <Nav>
              <LinkContainer to="/login">
              <Nav.Link>
                Sign In
              </Nav.Link></LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
