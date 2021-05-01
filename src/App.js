import './App.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
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
    }

    render() {
        return (
            <Router>
                <Header/>
                <div className="container"><br/>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/">
                            {/*<CreatePost />*/}
                            <NewsFeed />
                        </Route>
                    </Switch>
                </div>
                <Footer />
            </Router>
        );
    }
}

export default App;
