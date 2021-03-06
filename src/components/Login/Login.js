import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        }
    }

    setUsername = (e) => {
        this.setState({username: e.target.value})
    }
    setPassword = (e) => {
        this.setState({password: e.target.value})
    }

    login = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/login', {
            username: this.state.username,
            password: this.state.password
        }).then(function (response) {
            console.log(response.data);
            let token = JSON.stringify(response.data)
            localStorage.setItem('token',token)
            window.location.href = '/';
        }).catch(function (error) {
            alert(error);
        });
    }

    render() {
        return (
            <>
                <form>
                    <div className="form-group">
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={this.setUsername}
                                   value={this.state.username} style={style} placeholder="username"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" onChange={this.setPassword}
                                   value={this.state.password} style={style} placeholder="password"/>
                        </div>
                    </div>
                    <button className="btn btn-block btn-outline-success" onClick={this.login}>Login</button>
                </form>
            </>
        )
    }
}

const style = {
    color : "white",
    backgroundColor: '#484d4f',
    border : 'solid black 1px'
}

export default Login;
