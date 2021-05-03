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
            gender: '',
            date: null,
            file: null
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
    setGender = (e) => {
        this.setState({gender: e.target.value})
    }
    setDate = (e) => {
        const formatedDate = new Date(e.target.value).toISOString().slice(0, 10)
        this.setState({date: formatedDate})
    }

    handleChange = (event) => {
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(event.target.value)) {
            alert('Invalid file type');
            event.target.value = '';
            return false;
        } else {
            console.log(event.target.value)
            console.log(event.target.files[0])
            this.setState({
                file: event.target.files[0]
            })
        }
    }

    signup = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        formData.append('email', this.state.email);
        formData.append('password2', this.state.password2);
        formData.append('gender', this.state.gender);
        formData.append('birth_date', this.state.date);
        formData.append('profileImg', this.state.file);

        axios.post('http://localhost:8000/api/users/signup', formData
        ).then(function (response) {
            alert(response.data.message);
            window.location.href = '/login';
        }).catch(function (error) {
            alert('form is not valid');
            console.log(error.errors)
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

                    <div className="form-group">
                        <input type="date" required pattern="\d{4}-\d{2}-\d{2}" onChange={this.setDate}/>
                    </div>

                    <div className="form-group">
                        <input type="file" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="sel1">Select list:</label>
                        <select className="form-control" id="sel1" value={this.state.gender} onChange={this.setGender}>
                            <option value="none">Unknown</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>
                    <button className="btn btn-block btn-outline-success" onClick={this.signup}>Login</button>
                </form>
            </div>
        );
    }

}

export default Signup;
