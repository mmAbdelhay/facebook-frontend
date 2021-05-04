import React, { Component } from "react";
import styles from "./item.module.css";
import { friendshipStatus, acceptFriendRequest } from "../../Service/User";
import { Button } from "semantic-ui-react";
import { Redirect } from "react-router";

class RequestListItem extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   goToUserPage = () => {
      let link = "/profile/" + this.props.data;
      window.location.href = link;
   };

   acceptRequest = () => {
      acceptFriendRequest(this.props.data);
      window.location.href = "/friendRequests";
   };
   rejectRequest = () => {
      friendshipStatus("Not Friends", this.props.data);
      window.location.href = "/friendRequests";
   };

   render() {
      console.log(this.props.data);
      return (
         <div className={styles.postCard}>
            <div className={styles.topRowInfo}>
               <span className={styles.spanTextGroup} onClick={() => this.goToUserPage()}>
                  {this.props.data}
               </span>
               <div>
                  <Button positive onClick={() => this.acceptRequest()}>
                     Accept
                  </Button>
                  <Button negative onClick={() => this.rejectRequest()}>
                     Reject
                  </Button>
               </div>
            </div>
         </div>
      );
   }
}

export default RequestListItem;
