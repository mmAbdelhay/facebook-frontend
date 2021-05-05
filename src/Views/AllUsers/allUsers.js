import React, { Component } from "react";
import RequestListItem from "../../components/RequestListItem/RequestListItem";
import { getAllUsers } from "../../Service/User";
import styles from "./users.module.css";
export default class allUsers extends Component {
   constructor(props) {
      super(props);
      this.state = {
         users: [],
      };
   }

   goToUserPage = (name) => {
      let link = "/profile/" + name;
      window.location.href = link;
   };

   async componentDidMount() {
      //   console.log(await getFriendList());
      this.setState({
         users: await getAllUsers(),
      });
      console.log(this.state.users);
   }
   render() {
      return this.state?.users?.map((user, index) => {
         return (
            <div className={styles.postCard}>
               <div className={styles.topRowInfo}>
                  <span
                     className={styles.spanTextGroup}
                     onClick={() => this.goToUserPage(user.name)}>
                     {user.name}
                  </span>
               </div>
            </div>
         );
      });
   }
}
