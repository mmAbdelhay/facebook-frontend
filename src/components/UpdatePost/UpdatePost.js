import React from "react";
import "./UpdatePost.css";
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import axios from "axios";

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
            <button type="button" className="btn btn-outline-warning float-right m-2" data-toggle="modal" data-target="#exampleModal2">Edit</button>
            <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div  className="modal-dialog modal-dialog-centered">
                  <div id="modal2" className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel2">Update post</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                        </button>
                     </div>
                     <div className="modal-body">
                        <textarea onChange={this.setContent} cols="50" rows="5" placeholder={this.state.post.content} id="updatePost"/>
                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Close</button>
                        <button type="button" onClick={this.update} className="btn btn-outline-success">Update</button>
                     </div>
                  </div>
               </div>
            </div>
         </>
      );
   }
}

export default UpdatePost;
