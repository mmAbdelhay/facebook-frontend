import React, { Component } from "react";
import SignUp from "../components/Signup/Signup";

class Signup extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   render() {
      return (
         <div className="container">
            <SignUp />
         </div>
      );
   }
}

export default Signup;
