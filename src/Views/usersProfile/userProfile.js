import { getOtherUserData, getOtherUserPosts, friendshipStatus } from "../../Service/User";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Posts from "../../components/Post/Post";
import { serverURL } from "../../Service/serverURL";
import { Label, Icon } from "semantic-ui-react";
import styles from "./usersProfile.module.css";

export default function UserProfile() {
   let { username } = useParams();
   const [userData, setUserData] = useState({});
   const [buttonText, setButtonText] = useState("Loading");
   const [IconText, setIconText] = useState("");
   const [posts, setPosts] = useState([]);

   useEffect(async () => {
      if (userData.friends == "Pending") {
         setButtonText("Request Pending");
         setIconText("envelope");
      } else if (userData.friends == "Strangers") {
         setButtonText("Add Friend");
         setIconText("add user");
      } else if (userData.friends == "Friends") {
         setButtonText("Remove Friend");
         setIconText("close");
      } else if (userData.friends == "Sent") {
         setButtonText("Request Sent");
         setIconText("redo alternate");
      }

      console.log("User Updated");
   }, [userData]);
   useEffect(async () => {
      const data = await getOtherUserData(username);
      const posts = await getOtherUserPosts(username);
      setUserData(data);
      setPosts(posts);
      console.log(posts);
      // console.log(data);
   }, []);

   const dealWithRequest = () => {
      friendshipStatus(userData.friends, userData.username);
   };

   return (
      <>
         <div className={styles.fullPage}>
            <div className={styles.profileInfo}>
               <img
                  src={serverURL + userData.profileImg}
                  height="50%"
                  className="m-3"
                  style={{ borderRadius: "50%", width: "10%" }}
               />
               <div>
                  <h2 style={{ marginTop: 0, paddingRight: "3vw" }}>{userData.username}</h2>
                  <h3 style={{ margin: 0, paddingBottom: "1vw" }}>{userData.birth_date}</h3>
                  <Label as="a" onClick={dealWithRequest}>
                     <Icon name={IconText} />
                     {buttonText}
                  </Label>
               </div>
               <div className={styles.tags}>
                  {userData?.createdGroups?.map((item, index) => {
                     return (
                        <Label as="a" color="grey" tag>
                           {item.name}
                        </Label>
                     );
                  })}
                  {userData?.groups?.map((item, index) => {
                     return (
                        <Label as="a" color="teal" tag>
                           {item.GroupName}
                        </Label>
                     );
                  })}
               </div>
            </div>
            <div style={{ height: "auto", display: "inline-flex" }}>
               <div className={styles.ProfilePosts}>
                  {posts.map((item, index) => {
                     return <Posts key={item.id} post={item} />;
                  })}
               </div>
            </div>
         </div>
      </>
   );
}
