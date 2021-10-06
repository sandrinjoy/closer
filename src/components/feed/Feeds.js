import React from "react";
import { Image, Col, Button, Row, Card, Container } from "react-bootstrap";
import Navbar from "../Navbar";
import Posts from "./Posts";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useAuth } from "./../../contexts/AuthContext";
import SuggestedUsers from "./SuggestedUsers";
import { LinkContainer } from "react-router-bootstrap";
export default function Feeds() {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <Container fluid="xl">
        <Row className="my-1">
          <Col sm={12} md={9}>
            <Posts type="feed" />
          </Col>
          <Col md={3} className="mt-2 d-none d-md-block">
            <Card>
              <Card.Body>
                <LinkContainer to="/user">
                  <Button variant="">
                    <h6 className="h-100 my-auto text-start">
                      <Image
                        alt=""
                        src={currentUser.photoURL}
                        width="30"
                        height="30"
                        roundedCircle
                        className="border"
                      />{" "}
                      {currentUser.displayName}
                    </h6>
                  </Button>
                </LinkContainer>

                <Link
                  to="/user"
                  className="w-100 mt-3 d-flex justify-content-center  align-items-center btn btn-sm btn-outline-primary"
                >
                  <span className="px-2">Profile</span>
                  <AiOutlineArrowRight />
                </Link>
              </Card.Body>
            </Card>
            <SuggestedUsers />
          </Col>
        </Row>
      </Container>
    </>
  );
}
