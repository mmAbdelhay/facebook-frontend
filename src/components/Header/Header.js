import React from 'react';
import {Link} from "react-router-dom";
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";


class Header extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Facebook</Navbar.Brand>
                <Nav className="mr-auto">
                    <a href="/" className="nav-item nav-link">News Feed</a>
                    <Link to="/Login" className="nav-item nav-link">Login</Link>
                    <Link to="/Signup" className="nav-item nav-link">Signup</Link>
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



