import React from "react";
import "./CreatePost.css";
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import axios from "axios";

class CreatePost extends React.Component {
   constructor() {
      super();
      this.state = {
         content: '',
         file: null
      };
   }

   componentDidMount() {
      const [loginStatus, loginToken] = checkIfLoggedIn();
      if (loginStatus) {
         this.setState({
            isLoggedIn: loginStatus,
            token: loginToken,
            error:''
         });
      }else {
         window.location.href = '/login'
      }
   }

   setContent = (e) => {
      this.setState({ content: e.target.value });
   };

   handleChange2 = (event) => {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (!allowedExtensions.exec(event.target.value)) {
         alert('Invalid file type');
         event.target.value = '';
         return false;
      } else {
         console.log(event.target.files[0])
         this.setState({file: event.target.files[0]})
      }
   }

   create = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('content', this.state.content);
      formData.append('postImg', this.state.file);
      console.log(formData)
      axios.post('http://localhost:8000/api/posts/create', formData,{
         headers: {
            'Authorization': `Token ${this.state.token}`
         }
      }).then(function (response) {
         alert("post created successfully");
         window.location.href = '/'
      }).catch((error) => {
         if (error.response.data.error){
            this.setState({error: error.response.data.error})
         }
      });
   }


   render() {
      return (
         <>
        <div class ='fixed'> <button type="button" class="kc_fab_main_btn" data-toggle="modal" data-target="#exampleModal">+<div class="s">post</div></button></div>

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
               <div  className="modal-dialog modal-dialog-centered">
                  <div id="modal" className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create post</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                           <span aria-hidden="true">&times;</span>
                        </button>
                     </div>
                     <div className="modal-body">
                        {this.state.error && (<div className="alert alert-danger">{this.state.error}</div>)}
                        <textarea onChange={this.setContent} cols="57" rows="5" placeholder=" type your content" id="createPost" value={this.state.content} />
                        <input type="file" onChange={this.handleChange2}/>
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
