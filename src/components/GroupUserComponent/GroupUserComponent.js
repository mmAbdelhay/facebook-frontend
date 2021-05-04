import React from 'react';
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import axios from 'axios';
import {Link} from "react-router-dom";

class GroupUserComponent extends React.Component{


    constructor(props){
        super();
        this.state={
            user:props.user,
            token:JSON.parse(localStorage.getItem("token")).token
        };
    }

    
    deleteuser = async (e) => {
        console.log("in delete user");
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/groups/delete/?uid=${this.state.user.id}&gid=${this.props.gid}`, {
            headers: {
                'Authorization': `token ${this.state.token}`
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            alert("this isn't your group to delete user");
        });    
        window.location.href = `/groupusers/${this.props.gid}`
    }
    

    render(){
        return (
            <div className="card bg-dark text-white">
                <h2 className="card-header text-white">{this.state.user.username}</h2>
                <div className="card-body">
                <button onClick={this.deleteuser} className="btn btn-outline-danger float-right m-2">Delete User</button>
            </div>
        </div>
        )
    }
}

export default GroupUserComponent;