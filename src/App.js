import './App.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import NewsFeed from './components/NewsFeed/NewsFeed'
import CreatePost from "./components/CreatePost/CreatePost";


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            token: ''
        }
        if (localStorage.getItem('token') != null) {
            const tokenKey = JSON.parse(localStorage.getItem('token')).token
            // bugaya 5ara el setState m4 48ala
            this.setState({isLoggedIn: true, token: tokenKey})
            console.log(this.state.token, this.state.isLoggedIn)
        }
    }

    render() {
        if (!this.state.isLoggedIn) {
            return (
                <Router>
                    <Redirect to="/login"/>
                    <Header/>
                    <div className="container"><br/>
                    <Route path="/login" component={Login}/>
                    </div>
                    <Footer/>
                </Router>
            );
        } else {
            return (
                <Router>
                    <Header/>
                    <div className="container"><br/>
                        <Switch>
                            <Route path="/login" component={Login}/>
                            <Route path="/signup" component={Signup}/>
                            <Route path="/">
                                {/*<CreatePost />*/}
                                <NewsFeed/>
                            </Route>
                        </Switch>
                    </div>
                    <Footer/>
                </Router>
            );
        }
    }

}

export default App;
