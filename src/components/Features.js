import React from 'react'

import { Card,CardGroup,Button, Container, Row, Col } from "react-bootstrap";

export default function Features() {
    return (
        <><Container  style={{'height':'100vh'}} >
          <CardGroup className="h-100">
  <Card className="my-auto">
    <Card.Img variant="top" src="https://assets.website-files.com/5bff8886c3964a992e90d465/5bff98f85ea7faf86504605e_scenes.gif" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
      This card has supporting text below as a natural lead-in to additional
        content.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
  <Card className="my-auto">
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
  <Card className="my-auto">
    <Card.Img variant="top" src="https://assets.website-files.com/5bff8886c3964a992e90d465/5bff98f85ea7faf86504605e_scenes.gif" />
    <Card.Body>
      <Card.Title>Card title</Card.Title>
      <Card.Text>
      This card has supporting text below as a natural lead-in to additional
        content.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">Last updated 3 mins ago</small>
    </Card.Footer>
  </Card>
</CardGroup>
       </Container>
  
        </>
    )
}
