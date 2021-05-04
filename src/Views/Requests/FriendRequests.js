import React, { Component } from "react";
import RequestListItem from "../../components/RequestListItem/RequestListItem";
import { getFriendList } from "../../Service/User";
export default class FriendRequests extends Component {
   constructor(props) {
      super(props);
      this.state = {
         friends: [],
      };
   }
   async componentDidMount() {
      //   console.log(await getFriendList());
      this.setState({
         friends: await getFriendList(),
      });
   }
   render() {
      return (
         <div>
            {this.state.friends.map((item) => {
               return <RequestListItem key={item.FriendName} data={item.FriendName} />;
            })}
         </div>
      );
   }
}
