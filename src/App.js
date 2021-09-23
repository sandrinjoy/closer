import logo from "./logo.svg";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import firebase from "./firebase";
import { useState, useEffect } from "react";
import { Card,CardGroup,Button, Container, Row, Col } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import Features from "./components/Features"

import Footer from "./components/Footer"
import Login from "./components/Login"

import Register from "./components/Register"

import ScrollToTop from "./components/ScrollToTop"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  // const ref = firebase.firestore().collection("users");

  // const [email, setEmail] = useState([]);
  // const [loading, setLoading] = useState(false);

  // const getmails = () => {
  //   setLoading(true);
  //   ref.onSnapshot((q) => {
  //     const items = [];
  //     q.forEach((doc) => {
  //       items.push(doc.data().email);
  //     });
  //     setEmail(items);
  //     console.log(items);
  //     setLoading(false);
  //   });
  // };
  // useEffect(() => {
  //   getmails();
  // }, []);

  return (
    <>    <Router>
    <Navbar />
    <Container style={{'height':'100vh'}}>
    <ScrollToTop />

    <Switch>
      <Route exact path='/'>
        <Home />
      </Route> <Route exact path='/features'>
        <Features />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/signup'>
        <Register />
      </Route>
      <Route path='/home'>
        <Home />
      </Route>
    </Switch>
    
    
    <Footer/>
    </Container>
  </Router>
    </>
  );
}

export default App;
