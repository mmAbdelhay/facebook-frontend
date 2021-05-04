import React from "react";
import {Link} from "react-router-dom";
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";

class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            loginStatus: false,
        }
    }

    componentDidMount() {
        const [loginStatus, loginToken] = checkIfLoggedIn();
        if (loginStatus) {
            this.setState({loginStatus: true});
        }
    }

    logout = () => {
        if (this.state.loginStatus) {
            localStorage.clear();
            window.location.href = '/login'
        }
    }

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
                    {!this.state.loginStatus ?
                        <>
                            <Link to="/login" className="nav-item nav-link">
                                Login
                            </Link>
                            <Link to="/signup" className="nav-item nav-link">
                                Signup
                            </Link>
                        </>
                        :
                        <Link className="nav-item nav-link" onClick={this.logout}>logout</Link>
                    }
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        );
    }
}

export default Header;
