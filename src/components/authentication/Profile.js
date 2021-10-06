import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Col,
  Row,
  Image,
  ButtonGroup,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

import { db } from "../../firebase";
import Navbar from "./../Navbar";

import Connections from "../profileStats/Connections";

import Posts from "../feed/Posts";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    db.users.doc(currentUser.uid).onSnapshot((q) => {
      const data = q.data();
      setStats(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Row className="my-3 pb-3 border-bottom ">
          <Col sm={12} md={4} className="my-auto">
            <Image
              src={currentUser.photoURL}
              alt=""
              width="150"
              height="150"
              roundedCircle
              className="mx-auto  d-flex  border"
            />
          </Col>
          <Col sm={12} md={8}>
            <p className="display-6 text-md-start text-center mb-4">
              {currentUser.displayName}
            </p>
            <div className="border p-3">
              <Row>
                <Col>
                  <div className="d-flex flex-column">
                    <Button variant="">
                      Posts
                      <h4>{(!loading && stats.postsCount) || 0}</h4>
                    </Button>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex flex-column">
                    <Connections
                      userId={currentUser.uid}
                      connection="followers"
                    >
                      Followers
                      <h4>{(!loading && stats.followersCount) || 0}</h4>
                    </Connections>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex flex-column">
                    <Connections
                      userId={currentUser.uid}
                      connection="following"
                    >
                      Following
                      <h4>{(!loading && stats.followingCount) || 0}</h4>
                    </Connections>
                  </div>
                </Col>
              </Row>
            </div>

            <ButtonGroup className="w-100">
              <Link
                to="/update-user"
                className="btn btn-outline-primary   mt-3"
              >
                Edit Profile
              </Link>
              <Link
                to="/edit-profile"
                className="btn btn-outline-secondary  mt-3"
              >
                Edit Credenials
              </Link>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Posts type="user" userId={currentUser.uid} />
        </Row>
      </Container>
    </>
  );
}
