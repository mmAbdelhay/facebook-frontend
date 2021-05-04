import React from "react";
import { Redirect, Route } from "react-router-dom";
import App from "../App";
import Login from "../Views/login";
import Signup from "../Views/signup";
import UsersProfile from "../Views/usersProfile/userProfile";
import NewsFeed from "../components/NewsFeed/NewsFeed";
import CreatePost from "../components/CreatePost/CreatePost";
import Profile from "../Views/Profile/profile";
import FriendRequests from "../Views/Requests/FriendRequests";
import { checkIfLoggedIn } from "../Service/CheckUserStatus";
import MyCreatedGroups from "../components/MyCreatedGroups/MyCreatedGroups";
import GroupUsers from "../components/GroupUsers/GroupUsers";
import GroupApprove from "../components/GroupApprove/GroupApprove";


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
         <Route path="/profile/:username" exact>
            {status ? <UsersProfile /> : <Redirect to="/login" />}
         </Route>
         <Route path="/friendRequests" exact>
            {status ? <FriendRequests /> : <Redirect to="/login" />}
         </Route>
         <Route path="/login" exact>
            <Login />
         </Route>
         <Route path="/signup" exact>
            <Signup />
         </Route>
         <Route path="/mycreatedgroups" exact>
            <MyCreatedGroups />
         </Route>
         <Route path="/groupusers/:id" component={GroupUsers} />
         <Route path="/groupapprove/:id" component={GroupApprove} />



         {/*<UpdatePost />*/}
         {/* <App /> */}
         {/* </Route> */}
      </>
   );
}
