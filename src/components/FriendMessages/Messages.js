import React, { Component } from "react";
import pic from "../../img.jpg";

class Messages extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   render() {
      return (
         <>
            <div
               style={{
                  display: "flex",
                  flexWrap: "wrap",
               }}>
               <img src={pic} className="mr-2" width="40px" style={{ borderRadius: "50%" }} />
               <h4>{this.props.data.FriendName}</h4>
            </div>
         </>
      );
   }
}

export default Messages;
