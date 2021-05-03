import React, { Component } from "react";
import { Layout } from "antd";
import { getProfileData, getAllMessages, getAllPosts } from "../../Service/User";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Friends from "../../components/FriendMessages/Messages";
import ProfilePosts from "../../components/Profile Posts/ProfilePosts";
import styles from "./profilePage.module.css";
import Posts from "../../components/Post/Post";
import { serverURL } from "../../Service/serverURL";
import { Label } from "semantic-ui-react";
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
      console.log("User data", this.state.userData);
   }
   render() {
      return (
         <>
            <div className={styles.fullPage}>
               <div className={styles.profileInfo}>
                  <img
                     src={serverURL + this.state.userData.profileImg}
                     width="50px"
                     className="m-3"
                  />
                  <div>
                     <h2 style={{ marginTop: 0, paddingRight: "3vw" }}>
                        {this.state.userData.username}
                     </h2>
                     <h3 style={{ margin: 0 }}>{this.state.userData.birth_date}</h3>
                  </div>
                  <div className={styles.tags}>
                     {this.state?.userData?.createdGroups?.map((item, index) => {
                        return (
                           <Label as="a" color="white" tag>
                              {item.name}
                           </Label>
                        );
                     })}
                     {this.state?.userData?.groups?.map((item, index) => {
                        return (
                           <Label as="a" color="teal" tag>
                              {item.GroupName}
                           </Label>
                        );
                     })}
                     {/* <Label as="a" color="white" tag>
                        Featured
                     </Label>
                     <Label as="a" color="teal" tag>
                        Featured
                     </Label> */}
                  </div>
               </div>
               <div style={{ height: "auto", display: "inline-flex" }}>
                  <div className={styles.ProfilePosts}>
                     {this.state.posts.map((item, index) => {
                        return <Posts key={item.id} post={item} />;
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
                     {this.state.friendList.length ? (
                        this.state.friendList.map((item, index) => {
                           return <Friends key={index} data={item} />;
                        })
                     ) : (
                        <h1>wow such empty</h1>
                     )}
                  </div>
               </div>
            </div>
         </>
      );
   }
}
