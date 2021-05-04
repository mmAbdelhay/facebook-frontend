import React, { Component } from "react";
import { Layout } from "antd";
import { getProfileData, getAllMessages, getAllPosts } from "../../Service/User";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Friends from "../../components/FriendMessages/Messages";
import ProfilePosts from "../../components/Profile Posts/ProfilePosts";
import styles from "./profilePage.module.css";
import Posts from "../../components/Post/Post";
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
         posts: await getAllPosts(),
      });
      // console.log(this.state.userData);
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
                           <Posts key={item.id} post={item} />
                           // <ProfilePosts
                           //    key={index}
                           //    data={item}
                           //    userName={this.state.userData.username}
                           // />
                        );
                     })}
                  </div>
                  <div
                     className={styles.friendList}
                     style={{
                        backgroundColor: "#242526",
                        position: "absolute",
                        right: 0,
                        marginTop: "5vh",
                        paddingTop: "1vh",
                        paddingBottom: "1vh",
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
