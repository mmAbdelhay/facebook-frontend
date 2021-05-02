import React, { Component } from "react";
import { Layout } from "antd";
import { getProfileData, getAllMessages } from "../Service/User";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import Friends from "../components/FriendMessages/Messages";
import ProfilePosts from "../components/Profile Posts/ProfilePosts";
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
            <Layout
               className="mx-2"
               style={{
                  position: "fixed",
                  width: "25%",
                  left: 0,
               }}>
               <Content
                  style={{
                     backgroundColor: "transparent",
                     placeItems: "center",
                     overflow: "auto",
                  }}>
                  <ProfileCard userData={this.state.userData} />
               </Content>
            </Layout>
            <Layout
               className="mx-3"
               style={{
                  position: "fixed",
                  width: "45%",
                  left: "25%",
               }}>
               <Content style={{ height: "auto" }}>
                  {this.state.posts.map((item, index) => {
                     return (
                        <ProfilePosts
                           key={index}
                           data={item}
                           userName={this.state.userData.username}
                        />
                     );
                  })}
               </Content>
            </Layout>
            <Layout
               style={{
                  position: "fixed",
                  width: "27%",
                  left: "73%",
               }}>
               <Content style={{ overflow: "auto" }}>
                  <h1>FRIEND LIST</h1>
                  {this.state.friendList.map((item, index) => {
                     return <Friends key={index} data={item} />;
                  })}
               </Content>
            </Layout>
         </>
      );
   }
}
