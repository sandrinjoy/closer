import React from 'react'

import { Card,CardGroup,Button, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
export default function Home() {
    return (
        <>
                
        <Row className="h-100 my-auto " >
          <Col className=" my-auto  ">
            <div className=" rounded shadow p-5 d-flex flex-column justify-content-center">
              <h1>Closer Community</h1>
              <h4>Together, forever . ❤️</h4>
              <LinkContainer to="/signup">
              <Button className="mt-3"> Join Today</Button>
              </LinkContainer>
            </div>
          </Col >
          <Col className=" my-auto  ">
          <img className="img-fluid" src="https://assets.website-files.com/5bff8886c3964a992e90d465/5bff98f85ea7faf86504605e_scenes.gif" alt="illstration" />
          </Col>
        </Row>
        <Row>
          <a name="features"></a>
          <CardGroup>
  <Card>
    <Card.Img variant="top" src="https://assets.website-files.com/5bff8886c3964a992e90d465/5bff98f85ea7faf86504605e_scenes.gif" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This content is a little bit longer.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://assets.website-files.com/5bff8886c3964a992e90d465/5bff98f85ea7faf86504605e_scenes.gif" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This card has supporting text below as a natural lead-in to additional
        content.{' '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card>
    <Card.Img variant="top" src="https://assets.website-files.com/5bff8886c3964a992e90d465/5bff98f85ea7faf86504605e_scenes.gif" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
        This is a wider card with supporting text below as a natural lead-in to
        additional content. This card has even longer content than the first to
        show that equal height action.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
</CardGroup>
        </Row>
       
        </>
    )
}
