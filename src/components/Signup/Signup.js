import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            password2: '',
        }

    }

    setUsername = (e) => {
        this.setState({username: e.target.value})
    }
    setPassword = (e) => {
        this.setState({password: e.target.value})
    }
    setEmail = (e) => {
        this.setState({email: e.target.value})
    }
    setPassword2 = (e) => {
        this.setState({password2: e.target.value})
    }


    signup = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/signup', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            password2: this.state.password2,
        }).then(function (response) {
            alert(response.data.message);
            window.location.href = '/login';
        }).catch(function (error) {
            alert('form is not valid');
            console.log(error)
        });
    }

    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={this.state.username}
                            onChange={this.setUsername}
                            className="form-control"
                            placeholder="Enter name"
                            id="name"/>
                    </div>

                    <div className="form-group">
                        <label>Email Address:</label>
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.setEmail}
                            className="form-control"
                            placeholder="Enter email"
                            id="email"/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.setPassword}
                            className="form-control"
                            placeholder="Enter password"
                            id="password"/>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={this.state.password2}
                            onChange={this.setPassword2}
                            className="form-control"
                            placeholder="Enter confirm password"
                            id="confirm_password"/>
                    </div>
                    <button className="btn btn-block btn-outline-success" onClick={this.signup}>Login</button>
                </form>
            </div>
        );
    }

}

export default Signup;
