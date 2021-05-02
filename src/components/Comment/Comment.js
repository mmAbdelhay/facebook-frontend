import React from 'react';
import './comment.css'
class Comment extends React.Component {
    constructor(props) {
        super();
        this.state = {
            comment: props.comment
        }
    }
    render() {
        console.log(this.state.comment);

        return (
            <div className="card text-center" id="comment" style={{backgroundColor: "#42494d"}}>
                <h5 className="card-header">{this.state.comment.UID.username} added : </h5>
                <div className="card-body">
                    <p className="card-text">{this.state.comment.content}</p>
                    <p className="card-text"></p>
                </div>
            </div>
        )
    }
}

export default Comment;
