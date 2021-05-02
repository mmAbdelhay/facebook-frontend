import React from "react";
import axios from 'axios';
import { checkIfLoggedIn } from "../../Service/CheckUserStatus";
import './post.css'
import UpdatePost from "../UpdatePost/UpdatePost";
class Post extends React.Component {
    constructor(props) {
        super();
        this.state = {
            post: props.post,
            content: props.post.content,
            isLoggedIn: false,
            token: '',
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

    delete = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/posts/delete/${this.state.post.id}`, {
            headers: {
                'Authorization': `token ${this.state.token}`
            }
        }).then(function (response) {
            console.log(response.data);
            alert("post deleted successfully");
            window.location.href = '/'
        }).catch(function (error) {
            alert("this isn't your post to delete");
        });
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
            <div className="post" id="post">
                <button onClick={this.delete} className="btn btn-outline-danger float-right m-2">Delete</button>
                <UpdatePost post={this.state.post}/>
                <div className="post-header">
                    <img className="avatar"  />
                    <div className="details">
                        <span>{this.state.post.poster_ID.username}</span>
                        <span>{this.state.post.Time}</span>
                    </div>
                </div>
                <p className="post-content">{this.state.post.content}</p>
                <div className="post-comments">
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
                <div className="input-group mb-3">
                    <input type="text" className="form-control" id="commentInput" placeholder="add comment"
                           aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-success" type="button">Comment</button>
                        </div>
                </div>
                <button onClick={this.unlike} className="btn btn-outline-secondary float-right m-2">Dislike</button>
                <button onClick={this.like} className="btn btn-outline-primary float-right m-2">Like</button>
            </div>
        );
    }
}


export default Post;
