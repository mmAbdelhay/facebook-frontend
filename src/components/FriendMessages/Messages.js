import React, { Component } from "react";
import pic from "../../img.jpg";
import Drawer from "../MessageDrawer/MessageDrawer";

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
                  float: "right",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  cursor: "pointer",
               }}>
               {/* <img
                  src={pic}
                  className="mr-2"
                  width="20%"
                  height="50px"
                  style={{ borderRadius: "50%" }}
               /> */}
               {/* <h4>{this.props.data.FriendName}</h4> */}
               <Drawer pic={pic} input={this.props.data.FriendName} />
            </div>
         </>
      );
   }
}

export default Messages;
