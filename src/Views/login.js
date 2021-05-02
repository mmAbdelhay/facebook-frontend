import React, { Component } from "react";
import Login from "../components/Login/Login";

class LoginPage extends Component {
   constructor(props) {
      super(props);
      this.state = {};
      console.log("I AM IN LOGIN PAGE");
   }
   render() {
      return (
         <div className="container">
            <Login />
         </div>
      );
   }
}

export default LoginPage;
