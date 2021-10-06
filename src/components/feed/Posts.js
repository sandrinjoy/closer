import React, { useEffect, useState } from "react";

import { Col, Row, Card } from "react-bootstrap";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

import moment from "moment";

import { db } from "../../firebase";
import { useAuth } from "./../../contexts/AuthContext";
export default function Posts(props) {
  //props -> type="user" && userId || "feed"
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    function getPosts() {
      if (props.type === "feed") {
        db.posts
          .orderBy("createdAt", "desc")
          .limit(10)
          .onSnapshot((docs) => {
            let newPosts = [];
            docs.forEach((post) => {
              const data = post.data();
              data.id = post.id;

              if (data.createdAt) {
                data.createdAt = moment(
                  data.createdAt.toDate(),
                  "MMMM Do YYYY, h:mm:ss a"
                ).fromNow();
                newPosts.push(data);
              }
            });

            setPosts(newPosts);
          });
      } else if (props.type == "user") {
        db.posts
          .where("userId", "==", props.userId)
          .orderBy("createdAt", "desc")
          .onSnapshot((docs) => {
            const newPosts = [];
            docs.forEach((post) => {
              const data = post.data();
              data.id = post.id;

              if (data.createdAt) {
                data.createdAt = moment(
                  data.createdAt.toDate(),
                  "MMMM Do YYYY, h:mm:ss a"
                ).fromNow();
                newPosts.push(data);
              }
            });

            setPosts(newPosts);
          });
      }
    }
    getPosts();
  }, [props.userId, props.type]);

  return (
    <>
      {posts.map((post, index) => {
        return (
          <Card className="m-2" key={index}>
            <Card.Body>
              <Card.Title style={{ fontSize: "1rem" }}>
                {post.userId}
              </Card.Title>
              <Card.Text>{post.data}</Card.Text>
              {post.userId === currentUser.uid ? (
                <DeleteButton postId={post.id} />
              ) : (
                ""
              )}
            </Card.Body>

            <Card.Footer className="bg-white">
              <Row>
                <Col xs={12} md={8}>
                  <LikeButton
                    userLike={post.likesBy.includes(currentUser.uid)}
                    likes={post.likeCount}
                    postId={post.id}
                    posts={posts}
                  />
                </Col>
                <Col xs={6} md={4} className="text-md-end my-auto">
                  <small className="text-muted ">{post.createdAt}</small>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        );
      })}
    </>
  );
}
