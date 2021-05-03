import React from 'react';
import axios from 'axios';
import { checkIfLoggedIn } from "../../Service/CheckUserStatus";




// import './comment.css'
class Comment extends React.Component {
    constructor(props) {
        super();
        this.state = {
            comment: props.comment,
            commentText:'',
            token:''
        }
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

    deleteComment = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/posts/delete/comment/${this.state.comment.id}`, {
            headers: {
                'Authorization': `Token ${this.state.token}`
            }
        }).then(function (response) {
            console.log(response.data);
            alert("post deleted successfully");
            window.location.href = '/'
        }).catch(function (error) {
            alert("this isn't your comment to delete");
        });
    }
    render() {
        console.log(this.state.comment);

        return (
            <div key={this.state.comment.id} className="comment">
            <img className="avatar"/>
            <p>
                <span>{this.state.comment.UID.username}</span>
                {this.state.comment.content}
            </p>
            <button onClick={this.deleteComment} className="btn btn-outline-danger float-right m-2">Delete</button>

        </div>
        )
    }
}

export default Comment;
