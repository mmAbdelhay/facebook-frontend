import React from "react";
import {Link} from "react-router-dom";
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginStatus: false,
        };
    }

    componentDidMount() {
        const [loginStatus] = checkIfLoggedIn();
        if (loginStatus) {
            this.setState({loginStatus: true});
        }
    }

    logout = () => {
        if (this.state.loginStatus) {
            localStorage.clear();
            window.location.href = "/login";
        }
    };

    render() {
        return (
            <Navbar bg="dark" variant="dark" className="mb-4">
                <Navbar.Brand href="/">Facebook</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {this.state.loginStatus && (
                            <>
                                <a href="/" className="nav-item nav-link">
                                    News Feed
                                </a>
                                <Link to="/profile" className="nav-item nav-link">
                                    Profile
                                </Link>
                                <Link to="/friendRequests" className="nav-item nav-link ">
                                    Requests
                                </Link>
                            </>
                        )}
                    </Nav>
                    <Nav>
                        {!this.state.loginStatus ? (
                            <>
                                <Link to="/login" className="nav-item nav-link">
                                    Login
                                </Link>
                                <Link to="/signup" className="nav-item nav-link">
                                    Signup
                                </Link>
                            </>
                        ) : (
                            <Link className="nav-item nav-link float-right" onClick={this.logout}>
                                logout
                            </Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;
