import React from "react";
import axios from 'axios';
import { checkIfLoggedIn } from "../../Service/CheckUserStatus";


// import styles from "./post.module.css";
import Comments from '../Comment/Comment'
class Post extends React.Component {
   constructor(props) {
      super();
      this.state = {
         post: props.post,
         isLoggedIn: false,
         token: '',
      };
   }

   // render() {
   //    console.log(this.state.post)
   //    return (
   //       <div className="card" id={styles.post} style={{ backgroundColor: "#42494d" }}>
   //          <h5 className="card-header">By : {this.state.post.poster_ID.username}</h5>
   //          <p className="card-header">{this.state.post.Time}</p>
   //          <div className="card-body">
   //             <p className="card-text">{this.state.post.content}</p>
   //             <p className="card-text">Comments :</p>
      
   //              { this.state.post.post.map((item) => {
   //                  return (
   //                      <>
   //                          <Comments key={item.id} comment={item}/>
   //                          <br/>
   //                      </>
   //                  )
   //              }) }
            
   //             <a href="#" className="btn btn-danger float-right m-2">
   //                dislike
   //             </a>
   //             <a href="#" className="btn btn-primary float-right m-2">
   //                Like
   //             </a>
   //          </div>
           
   //       </div>
   //    );

   // }
   componentDidMount() {
      const [loginStatus, loginToken] = checkIfLoggedIn();
      if (loginStatus) {
         this.setState({
            isLoggedIn: loginStatus,
            token: loginToken,
         });
      }else {
         window.location.href = '/login'
      }
   }

    
   like = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8000/api/posts/like', {
         
         PID: this.state.post.id
      },{
         headers: {
           'Authorization': `token ${this.state.token}`
         }
       }).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          alert(error);
      });
  }
  unlike = (e) => {
   e.preventDefault();
   axios.delete('http://localhost:8000/api/posts/unlike/'+this.state.post.id,{
      headers: {
        'Authorization': `token ${this.state.token}`
      }
    }).then(function (response) {
       console.log(response.data);
   }).catch(function (error) {
       alert(error);
   });
}
    
    render (){
      return (
        <div className="post">
           <div className="post-header">
          <img className="avatar"  />
          <div className="details">
            <span>{this.state.post.poster_ID.username}</span>
            <span>{this.state.post.Time}</span>
          </div>
        </div>
          <p className="post-content">{this.state.post.content}</p>
          <div className="post-comments">
       
                      <button onClick={this.unlike} className="btn btn-danger float-right m-2">dislike </button>
                  <button onClick={this.like} className="btn btn-primary float-right m-2">
                  Like
              </button>
          <hr style={{color:"white"}}/>
          {this.state.post.post.map(comment => (
            <div key={comment.id} className="comment">
              <img className="avatar"/>
              <p>
                <span>{comment.UID.username}</span>
                {comment.content}
              </p>
            </div>
          ))}
        </div> 
      </div>
      );
      }
    }


export default Post;
