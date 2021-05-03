import React, { Component } from "react";
import { Layout } from "antd";
import { getProfileData, getAllMessages } from "../../Service/User";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Friends from "../../components/FriendMessages/Messages";
import ProfilePosts from "../../components/Profile Posts/ProfilePosts";
import styles from "./profilePage.module.css";
const { Content, Sider } = Layout;
export default class profile extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userData: {},
         friendList: [],
         posts: [],
      };
   }

   async componentDidMount() {
      this.setState({
         userData: await getProfileData(),
      });

      this.setState({
         friendList: this.state.userData.friends,
      });
      this.setState({
         posts: this.state.userData.posts,
      });
      console.log(this.state.userData);
   }
   render() {
      return (
         <>
            <div className={styles.fullPage}>
               <div>Info here</div>
               <div style={{ height: "auto", display: "inline-flex" }}>
                  <div className={styles.ProfilePosts}>
                     {this.state.posts.map((item, index) => {
                        return (
                           <ProfilePosts
                              key={index}
                              data={item}
                              userName={this.state.userData.username}
                           />
                        );
                     })}
                  </div>
                  <div
                     className={styles.friendList}
                     style={{
                        backgroundColor: "red",
                        position: "absolute",
                        right: 0,
                        width: "20vw",
                        marginTop: "5vh",
                     }}>
                     {this.state.friendList.map((item, index) => {
                        return <Friends key={index} data={item} />;
                     })}
                  </div>
               </div>
            </div>
         </>
      );
   }
}
