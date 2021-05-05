import React from "react";
import axios from 'axios';
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import {
    ThumbsdownIcon,
    ThumbsupIcon,
    CommentDiscussionIcon,
    XCircleFillIcon,
    ArrowRightIcon,
    PinIcon, PencilIcon
} from '@primer/octicons-react'
import './post.css'
import UpdatePost from "../UpdatePost/UpdatePost";
import Comment from '../Comment/Comment';
import defaultImg from './default_img.png'
import {bindReporter} from "web-vitals/dist/modules/lib/bindReporter";
import {Link} from "react-router-dom";

class Post extends React.Component {
    constructor(props) {
        super();
        this.state = {
            post: props.post,
            content: props.post.content,
            isLoggedIn: false,
            token: '',
            comment: '',
            update: false,
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
            }).catch((error) => {
                if (error.response.data.error) {
                    this.setState({error: error.response.data.error})
                }
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

    updatePost = () => {
        this.setState({update: true})
    }

    returnToPost = () => {
        this.setState({update: false})
    }


    render() {
        if (this.state.update) {
            return (
                <>
                    <button onClick={this.returnToPost} className="btn btn-sm btn-outline-warning float-sm-right m-2">
                        return
                    </button>
                    <UpdatePost post={this.state.post}/>
                </>

            );
        } else {
            return (
                <div className="post" id="post">
                    {this.state.post.mypost === 1 && (
                        <>
                            <button onClick={this.delete} className="btn btn-sm btn-outline-light float-right m-2">
                                <XCircleFillIcon
                                    size={18}/></button>
                            <button type="button" className="btn btn-outline-light float-right m-2 btn-sm"
                                    onClick={this.updatePost}><PencilIcon size={18}/></button>
                        </>)}
                    <div className="post-header">
                        {this.state.post.poster_ID.profileImg ? (
                            <img className="avatar"
                                 src={"http://localhost:8000" + this.state.post.poster_ID.profileImg}/>
                        ) : (
                            <img className="avatar"
                                 src={defaultImg} />
                        )}
                        <div className="details">

                            <span>{this.state.post.poster_ID.username}{this.state.post.group_ID?(<> <ArrowRightIcon/> <a href={"/grouppage/"+this.state.post.group_ID.id}><span>{this.state.post.group_ID.name}</span></a> </>):(<></>)}</span>

                            <span>{this.state.post.Time}</span>
                        </div>
                    </div>
                    <p className="post-content">{this.state.post.content}</p>
                    {this.state.post.postImg && <img src={"http://localhost:8000" + this.state.post.postImg}
                                                     className="rounded mx-auto d-block" alt="img"/>}
                    {!this.state.post.liked ? (
                        <>
                            <button onClick={this.like} className="btn btn-outline-primary btn-block btn-lg m-2"
                                    style={{margin: "-11px !important", size: '10px', padding: '6px'}}><ThumbsupIcon
                                size={20}/> like
                            </button>
                            <hr/>
                        </>
                    ) : (
                        <>
                            <button onClick={this.unlike} className="btn btn-outline-danger btn-block btn-lg m-2"
                                    style={{margin: "-11px !important", size: '10px', padding: '6px'}}><ThumbsdownIcon
                                size={20}/> unlike
                            </button>
                            <hr/>
                        </>
                    )}
                    <div className="post-comments">
                        {this.state.post.post.map(comment => (
                            <Comment comment={comment}/>
                        ))}
                    </div>
                    <br/>
                    {this.state.error && (<h4 style={{color: 'red'}}>{this.state.error}</h4>)}
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" id="commentInput" name='comment'
                               placeholder="add comment"
                               aria-label="Recipient's username" aria-describedby="basic-addon2"
                               onChange={this.setCommentContent}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={this.addComment}>
                                <ArrowRightIcon size={18}/></button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}


export default Post;
