import "bootstrap/dist/css/bootstrap.min.css";
import "./../App.css";
import {  Container } from "react-bootstrap";
import Navbar from "./Navbar";
import Home from "./Home"
import Features from "./Features"
import Login from "./Login"
import Register from "./Register"
import ScrollToTop from "./ScrollToTop"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";

import ForgotPassword from "./ForgotPassword";

import EditProfile from "./EditProfile";
function App() {


  return (
  
      
    <Container className="d-flex  align-items-center justify-content-center"style={{'minHeight':'100vh'}}>
    <Router>
    <AuthProvider>    
    <ScrollToTop />

    <Switch>
      <Route exact path='/'>
        <Home />
      </Route> 
      <Route exact path='/features'>
        <Features />
      </Route>
      <PrivateRoute  path='/dashboard' component={Dashboard}/>
        
      <PrivateRoute path='/edit-profile' component={EditProfile}/>
      <Route path='/login'  component={Login}/>
      <Route path='/signup' component={Register}/>
      
       <Route path='/forgot-password' component={ForgotPassword}/>
      <Route path='/home'>
        <Home />
      </Route>
    </Switch>
    
    </AuthProvider>   
    </Router>
    </Container>
  );
}

export default App;
