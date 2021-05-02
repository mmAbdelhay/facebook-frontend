import React, { Component } from "react";
import { Card } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import styles from "./posts.module.css";
import pic from "../../img.jpg";

class ProfilePosts extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      console.log(this.props.data);
      return (
         <div className={styles.postCard}>
            <img src={pic} className={styles.postImg} />
            <div>
               <h6>{this.props.userName}</h6>
               <p style={{ display: "inline" }}>{this.props.data.Time}</p>
            </div>
            {this.props.data.group_ID ? (
               <div>
                  <CaretRightOutlined />
                  <p style={{ display: "inline" }}>Group: {this.props.data.group_ID}</p>
               </div>
            ) : (
               <p></p>
            )}

            <p className={styles.content}>{this.props.data.content}</p>
         </div>
      );
   }
}

export default ProfilePosts;
