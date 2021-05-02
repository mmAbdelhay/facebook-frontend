import React from "react";
import Post from "../Post/Post";

class NewsFeed extends React.Component {
   constructor() {
      super();
      this.state = {
         posts: [],
         loading: false,
         token: JSON.parse(localStorage.getItem("token")).token,
      };
   }

   async componentDidMount() {
      console.log(this.state.token);
      this.setState({ loading: true });
      let res = await fetch("http://localhost:8000/api/posts/", {
         method: "GET",
         headers: {
            Authorization: `Token ${this.state.token}`,
         },
      });

      let resJson = await res.json();
      this.setState({ posts: resJson, loading: false });
   }

   render() {
      return (
         <div className="col-sm-12">
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
