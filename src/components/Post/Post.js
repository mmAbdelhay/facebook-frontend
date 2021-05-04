import React from "react";
import axios from 'axios';
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import { ThumbsdownIcon, ThumbsupIcon, CommentDiscussionIcon ,XCircleFillIcon,ArrowRightIcon,PinIcon} from '@primer/octicons-react'
import './post.css'
import UpdatePost from "../UpdatePost/UpdatePost";
import Comment from '../Comment/Comment'

class Post extends React.Component {
    constructor(props) {
        super();
        this.state = {
            post: props.post,
            content: props.post.content,
            isLoggedIn: false,
            token: '',
            comment: ''
        };
    }

    componentDidMount() {
        const [loginStatus, loginToken] = checkIfLoggedIn();
        if (loginStatus) {
            this.setState({
                isLoggedIn: loginStatus,
                token: loginToken,
            });
        } else {
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
    setCommentContent = (e) => {
        // console.log(e.target.value)
        this.setState({comment: e.target.value});
        console.log(this.state.comment)
    }
    addComment = (e) => {
        console.log(this.state.token)
        console.log(this.state.post.id)
        if (this.state.comment !== '') {
            e.preventDefault();
            axios.post(`http://localhost:8000/api/posts/addComment`, {
                content: this.state.comment,
                postID: this.state.post.id
            }, {
                headers: {
                    'Authorization': `Token ${this.state.token}`
                }
            }).then(function (response) {
                console.log(response.data);
                window.location.href = '/'
            }).catch(function (error) {
                alert(error);
            });
        } else {
            console.log('no changes')
        }
    }


    like = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/posts/like', {
            PID: this.state.post.id
        }, {
            headers: {
                'Authorization': `token ${this.state.token}`
            }
        }).then(function (response) {
            window.location.href = '/'
            console.log(response.data);
        }).catch(function (error) {
            alert(error);
        });
    }

    unlike = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:8000/api/posts/unlike/' + this.state.post.id, {
            headers: {
                'Authorization': `token ${this.state.token}`
            }
        }).then(function (response) {
            console.log(response.data);
            window.location.href = '/'
        }).catch(function (error) {
            alert(error);
        });
    }


    render() {
        return (
            <div className="post" id="post">
                <button onClick={this.delete} className="btn btn-sm btn-outline-light float-right m-2"><XCircleFillIcon size={18} /></button>

                <UpdatePost post={this.state.post}/>
                <div className="post-header">
                    <img className="avatar" src={"http://localhost:8000"+this.state.post.poster_ID.profileImg}/>
                    <div className="details">
                        <span>{this.state.post.poster_ID.username}</span>
                        <span>{this.state.post.Time}</span>
                    </div>
                </div>
                <p className="post-content">{this.state.post.content}</p>
                {this.state.post.postImg && <img src={"http://localhost:8000"+this.state.post.postImg} width="400px" className="rounded mx-auto d-block" alt="img"/>}
                <hr />
                {!this.state.post.liked ? (
                                 <button onClick={this.like} className="btn btn-outline-primary btn-lg btn-block m-2" style={{margin:"-11px !important" ,size:'10px',padding:'6px'}}><ThumbsupIcon size={20} />   like   </button>

               ) : (
                <button onClick={this.unlike} className="btn btn-outline-light  btn-lg btn-block m-2" style={{margin:"-11px !important" ,size:'10px',padding:'6px'}} ><ThumbsdownIcon size={20} />   unlike       </button>

               )}
                    <hr />
                <div className="post-comments">
               
               
                    {this.state.post.post.map(comment => (
                        <Comment comment={comment}/>

                    ))}
                </div>
                <br/>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" id="commentInput" name='comment'
                           placeholder="add comment"
                           aria-label="Recipient's username" aria-describedby="basic-addon2"
                           onChange={this.setCommentContent}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.addComment}><ArrowRightIcon size={18} /></button>
                    </div>
                </div>
               
            </div>
        );
    }
}


export default Post;
