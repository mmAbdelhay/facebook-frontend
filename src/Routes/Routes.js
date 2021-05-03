import React from "react";
import { Redirect, Route } from "react-router-dom";
import App from "../App";
import Login from "../Views/login";
import Signup from "../Views/signup";
import NewsFeed from "../components/NewsFeed/NewsFeed";
import CreatePost from "../components/CreatePost/CreatePost";
import Profile from "../Views/Profile/profile";
import { checkIfLoggedIn } from "../Service/CheckUserStatus";

export default function Routes() {
   const [status] = checkIfLoggedIn();
   return (
      <>
         <Route path="/" exact>
            {status ? <App /> : <Redirect to="/login" />}
         </Route>
         <Route path="/profile" exact>
            {status ? <Profile /> : <Redirect to="/login" />}
         </Route>
         <Route path="/login" exact>
            <Login />
         </Route>
         <Route path="/signup" exact>
            <Signup />
         </Route>
         {/*<UpdatePost />*/}
         {/* <App /> */}
         {/* </Route> */}
      </>
   );
}
