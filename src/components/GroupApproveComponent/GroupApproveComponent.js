import React from 'react';
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import axios from 'axios';
import {Link} from "react-router-dom";

class GroupApproveComponent extends React.Component{


    constructor(props){
        super();
        this.state={
            user:props.user,
            token:JSON.parse(localStorage.getItem("token")).token,
        };
        console.log(this.state.user);
    }

    
    approve = async (e) => {
        console.log(this.state.user.id);
        e.preventDefault();
        axios.put(`http://localhost:8000/api/groups/approve/${this.state.user.id}`, {
            GID: this.props.gid
        }, {
            headers: {
                'Authorization': `Token ${this.state.token}`
            }
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            alert(error);
        });
        window.location.href = `/groupapprove/${this.props.gid}`
    }
    

    render(){
        return (
            <div className="card bg-dark text-white">
                <h2 className="card-header text-white">{this.state.user.username}</h2>
                <div className="card-body">
                <button onClick={this.approve} className="btn btn-outline-success float-right m-2">Approve</button>
            </div>
        </div>
        )
    }
}

export default GroupApproveComponent;