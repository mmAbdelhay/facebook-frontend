import React from 'react';
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import axios from 'axios';
import {Link} from "react-router-dom";

class CancelJoinRequest extends React.Component{


    constructor(props){
        super();
        this.state={
            user:props.user,
            group:props.group,
            token:JSON.parse(localStorage.getItem("token")).token
        };
    }

    
    deleterequest = async (e) => {
        console.log("in delete user");
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/groups/cancel/?gid=${this.props.group.id}`, {
            headers: {
                'Authorization': `token ${this.state.token}`
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            alert("there isn't any request now");
        });    
        window.location.href = `/requestedGroups/`
    }
    

    render(){
        return (
            
               
               
           
         <div className="card bg-dark text-white" key={this.state.group.id}>
         <h2 className="card-header text-white">{this.state.group.name}
         </h2>
         <div className="card-body">
         <p className="card-text">{this.state.group.overview}</p>
         <button onClick={this.deleterequest} className="btn btn-outline-danger float-right m-2">Cancel Request</button>
         </div>
     </div>
        )
    }
}

export default CancelJoinRequest;