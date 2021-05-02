import React from "react";
import styles from "./post.module.css";
import Comments from '../Comment/Comment'
class Post extends React.Component {
   constructor(props) {
      super();
      this.state = {
         post: props.post,
      };
   }

   render() {
      console.log(this.state.post)
      return (
         <div className="card" id={styles.post} style={{ backgroundColor: "#42494d" }}>
            <h5 className="card-header">By : {this.state.post.poster_ID.username}</h5>
            <p className="card-header">{this.state.post.Time}</p>
            <div className="card-body">
               <p className="card-text">{this.state.post.content}</p>
               <p className="card-text">Comments :</p>
               <div className="col-sm-6">
                { this.state.post.post.map((item) => {
                    return (
                        <>
                            <Comments key={item.id} comment={item}/>
                            <br/>
                        </>
                    )
                }) }
            </div>
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
