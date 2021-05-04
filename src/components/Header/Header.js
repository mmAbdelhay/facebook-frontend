import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";

class Header extends React.Component {
   render() {
      return (
         <Navbar bg="dark" variant="dark" className="mb-4">
            <Navbar.Brand href="/">Facebook</Navbar.Brand>
            <Nav className="mr-auto">
               <a href="/" className="nav-item nav-link">
                  News Feed
               </a>
               <Link to="/profile" className="nav-item nav-link">
                  Profile
               </Link>
               <Link to="/login" className="nav-item nav-link">
                  Login
               </Link>
               <Link to="/friendRequests" className="nav-item nav-link">
                  Requests
               </Link>
               <Link to="/signup" className="nav-item nav-link">
                  Signup
               </Link>
               <Link to="/logout" className="nav-item nav-link">
                  logout
               </Link>
            </Nav>
            <Form inline>
               <FormControl type="text" placeholder="Search" className="mr-sm-2" />
               <Button variant="outline-info">Search</Button>
            </Form>
         </Navbar>
      );
   }
}

export default Header;
