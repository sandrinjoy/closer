import React, { useState, useEffect } from "react";
import { Container, Button, Col, Row, Image } from "react-bootstrap";

import { db } from "../../firebase";
import Navbar from "./../Navbar";
import { useParams } from "react-router-dom";
import Connections from "../profileStats/Connections";

import Posts from "../feed/Posts";
import FollowUserButton from "../feed/FollowUserButton";

export default function User() {
  const { userId } = useParams();
  console.log(userId);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    db.users
      .doc(userId)
      .get()
      .then((q) => {
        const data = q.data();

        setStats(data);

        setLoading(false);
      });
  }, [userId]);

  return (
    <>
      <Navbar />
      <Container>
        <Row className="my-3 pb-3 border-bottom ">
          <Col sm={12} md={4} className="my-auto">
            {!loading && (
              <Image
                src={stats.photoUrl}
                alt=""
                width="150"
                height="150"
                roundedCircle
                className="mx-auto  d-flex  border"
              />
            )}
          </Col>
          <Col sm={12} md={8}>
            <p className="display-6 text-md-start text-center mb-4">
              {!loading && stats.name}{" "}
              {!loading && <FollowUserButton userId={stats.uid} />}
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
                    {!loading && (
                      <Connections userId={stats.uid} connection="followers">
                        Followers
                        <h4>{(!loading && stats.followersCount) || 0}</h4>
                      </Connections>
                    )}
                  </div>
                </Col>
                <Col>
                  <div className="d-flex flex-column">
                    {!loading && (
                      <Connections userId={stats.uid} connection="following">
                        Following
                        <h4>{(!loading && stats.followingCount) || 0}</h4>
                      </Connections>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>{!loading && <Posts type="user" userId={stats.uid} />}</Row>
      </Container>
    </>
  );
}
