import React from "react";
import "./UpdatePost.css";
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import axios from "axios";
import { ThumbsdownIcon, ThumbsupIcon, CommentDiscussionIcon ,XCircleFillIcon,ArrowRightIcon,PencilIcon} from '@primer/octicons-react'
import Comment from "../Comment/Comment";


class UpdatePost extends React.Component {
   constructor(props) {
      super();
      this.state = {
         post: props.post,
         content: ''
      };
   }

   componentDidMount() {
      console.log("inside update")
      console.log(this.state.post, this.props.post.content)
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

   setContent = (e) => {
      this.setState({ content: e.target.value });
   };

   update = (e) => {
      e.preventDefault();
      if (!this.state.content){
         return false;
      }
      axios.put(`http://localhost:8000/api/posts/update/${this.state.post.id}`, {
            content: this.state.content,
            poster_ID: this.state.post.poster_ID.id
      },{
         headers: {
            'Authorization': `Token ${this.state.token}`
         }
      }).then(function (response) {
         console.log(response.data);
         alert("post updated successfully");
         window.location.href = '/'
      }).catch(function (error) {
         alert("this isn't your post to update");
      });
   }

   render() {
      return (
         <>
            <div className="post" id="post">
               <div className="post-header">
                  <img className="avatar" src={"http://localhost:8000" + this.state.post.poster_ID.profileImg}/>
                  <div className="details">
                     <span>{this.state.post.poster_ID.username}</span>
                     <span>{this.state.post.Time}</span>
                  </div>
               </div>
               <textarea rows="8" className="post-content" onChange={this.setContent} placeholder={this.state.post.content} value={this.state.content} id="updatePost"/>
               <button className="btn btn-block btn-outline-success" onClick={this.update}>Update</button>
            </div>
         </>
      );
   }
}

export default UpdatePost;
