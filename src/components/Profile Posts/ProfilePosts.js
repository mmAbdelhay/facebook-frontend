import React, { Component } from "react";
import { Card } from "antd";
import { CaretRightFilled, ImportOutlined } from "@ant-design/icons";
import styles from "./posts.module.css";
import pic from "../../img.jpg";

class ProfilePosts extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   sound = () => {
      console.log("HELLO");
   };

   render() {
      console.log(this.props.data);
      return (
         <div className={styles.postCard}>
            <div className={styles.topRowInfo}>
               <img src={pic} className={styles.postImg} />

               <div className={styles.spanHolders}>
                  {/* <h6>{this.props.userName}</h6>
                  <p>{this.props.data.Time}</p> */}
                  <span className={styles.spanText}>{this.props.userName}</span>

                  {this.props.data.group_ID ? (
                     <>
                        <CaretRightFilled />
                        <span className={styles.spanTextGroup} onClick={this.sound}>
                           Group: {this.props.data.group_ID}
                        </span>
                     </>
                  ) : (
                     <p></p>
                  )}
               </div>
            </div>
            <div className={styles.contentHolder}>
               <p className={styles.content}>{this.props.data.content}</p>
            </div>
         </div>
      );
   }
}

export default ProfilePosts;
