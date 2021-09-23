import React from 'react'

import { Form,Card,CardGroup,Button, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
export default function Login() {
    return (
        <>
                <Container  style={{'height':'100vh'}}>
        <Row className="h-100 my-auto " >
          <Col className=" my-auto  ">
            <div className=" rounded shadow p-5 d-flex flex-column justify-content-center">
              <h1>Closer Community</h1>
              <h4>Together, forever . ❤️</h4>
              
            </div>
          </Col >
          <Col className=" my-auto  ">
          <div className="  rounded shadow p-5 d-flex flex-column justify-content-center">
              <h5 className="text-center mb-5">Login</h5>
              <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
        
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  
  <Button variant="primary" type="submit" className="w-100">
    Login
  </Button>
  <hr /> 
  <div className="   mx-auto">
  <LinkContainer to="/signup">
  <Button variant="nav-link" type="submit" className="btn-sm w-100  ">
    Don't have an Account ? Sign Up
  </Button>
  </LinkContainer></div>
</Form>
            </div>
            </Col>
        </Row>
        
        
      </Container>
  
        </>
    )
}
