import React, { Component } from "react";
import { Card } from "antd";
class ProfilePosts extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   render() {
      console.log(this.props.data);
      return (
         <Card title={this.props.userName} bordered={false} style={{ width: "100%" }}>
            {this.props.data.group_ID ? <p>Group: {this.props.data.group_ID}</p> : <p></p>}
            <p> {this.props.data.Time}</p>
            <p>{this.props.data.content}</p>
            {this.props.data.postImg ? <img src={this.props.data.postImg} /> : <></>}
         </Card>
         //  <div>
         //     <h6 style={{ display: "inline" }}>{this.props.userName} </h6>
         //     <h6 className="ml-1" style={{ display: "inline" }}>
         //        {this.props.data.group_ID}
         //     </h6>
         //     <h6 className="ml-5" style={{ display: "inline" }}>
         //        {this.props.data.Time}
         //     </h6>
         //     <p style={{ color: "black" }}>{this.props.data.content}</p>
         //     <img />
         //  </div>
      );
   }
}

export default ProfilePosts;
