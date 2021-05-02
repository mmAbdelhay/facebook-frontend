import React from "react";
import "./CreatePost.css";
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import axios from "axios";

class CreatePost extends React.Component {
   constructor() {
      super();
      this.state = {
         content: ''
      };
   }

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

   setContent = (e) => {
      this.setState({ content: e.target.value });
   };

   create = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8000/api/posts/create', {
         content: this.state.content
      },{
         headers: {
            'Authorization': `token ${this.state.token}`
         }
      }).then(function (response) {
         alert("post created successfully");
         window.location.href = '/'
      }).catch(function (error) {
         alert(error);
      });
   }


   render() {
      return (
         <>
            <button type="button" className="btn btn-block btn-outline-success" data-toggle="modal" data-target="#exampleModal">
               Create post
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div  className="modal-dialog modal-dialog-centered">
                  <div id="modal" className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create post</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                        </button>
                     </div>
                     <div className="modal-body">
                        <textarea onChange={this.setContent} cols="45" rows="5" placeholder=" type your content" id="createPost" value={this.state.content} />
                     </div>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Close</button>
                        <button type="button" onClick={this.create} className="btn btn-outline-success">Create</button>
                     </div>
                  </div>
               </div>
            </div>
         </>
      );
   }
}

export default CreatePost;
