import React from "react";
import styles from "./post.module.css";
class Post extends React.Component {
   constructor(props) {
      super();
      this.state = {
         post: props.post,
      };
   }

   render() {
      return (
         <div className="card" id={styles.post} style={{ backgroundColor: "#42494d" }}>
            <h5 className="card-header">poster id :{this.state.post.poster_ID}</h5>
            <div className="card-body">
               <p className="card-text">{this.state.post.content}</p>
               <p className="card-text">Comments :</p>
               <a href="#" className="btn btn-danger float-right m-2">
                  dislike
               </a>
               <a href="#" className="btn btn-primary float-right m-2">
                  Like
               </a>
            </div>
         </div>
      );
   }
}

export default Post;
