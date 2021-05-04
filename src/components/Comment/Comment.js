import React from 'react';
import axios from 'axios';
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import { XCircleFillIcon } from '@primer/octicons-react'



// import './comment.css'
class Comment extends React.Component {
    constructor(props) {
        super();
        this.state = {
            comment: props.comment,
            commentText: '',
            token: ''
        }
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

    deleteComment = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/posts/delete/comment/${this.state.comment.id}`, {
            headers: {
                'Authorization': `Token ${this.state.token}`
            }
        }).then(function (response) {
            console.log(response.data);
            window.location.href = '/'
        }).catch(function (error) {
            alert("this isn't your comment to delete");
        });
    }

    render() {
        console.log(this.state.comment);

        return (
            <>
                <button onClick={this.deleteComment} className="btn btn-sm btn-outline-light float-right m-2"><XCircleFillIcon size={18} /></button>
                <div key={this.state.comment.id} className="comment">
                    <img className="avatar" src={"http://localhost:8000"+this.state.comment.UID.profileImg}/>
                    <p>
                        <span>{this.state.comment.UID.username}</span>
                        <br/>
                        {this.state.comment.content}
                    </p>
                </div>
            </>
        )
    }
}

export default Comment;
