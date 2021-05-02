import React from "react";
import Post from "../Post/Post";
import { checkIfLoggedIn } from "../../Service/CheckUserStatus";
import { getAllPosts } from "../../Service/Posts";
import axios from "axios";

class NewsFeed extends React.Component {
   constructor() {
      super();
      this.state = {
         posts: [],
         loading: false,
         //it should be passed from props according to user logged in
         token: "",
      };
   }

   async componentDidMount() {
      //   const [status, token] = checkIfLoggedIn();
      //   this.setState({
      //      token: token,
      //   });
      this.setState({ loading: true });

      const response = await getAllPosts();
      //   console.log(response);
      this.setState({ posts: response, loading: false });
   }

   render() {
      return (
         <div className="col-sm-6">
            {!this.state.loading ? (
               this.state.posts.map((item) => {
                  return (
                     <div key={item.id}>
                        <Post key={item.id} post={item} />
                        <br />
                     </div>
                  );
               })
            ) : (
               <div>Posts is loading ...</div>
            )}
         </div>
      );
   }
}

export default NewsFeed;
