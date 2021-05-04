import React from 'react';
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import axios from 'axios';
import {Link} from "react-router-dom";

class GroupComponent extends React.Component{

    constructor(props){
        super();
        this.state={
            group:props.group,
            token:JSON.parse(localStorage.getItem("token")).token,
        };
    }


    delete = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:8000/api/groups/delete/${this.state.group.id}`, {
            headers: {
                'Authorization': `token ${this.state.token}`
            }
        }).then(function (response) {
            console.log(response.data);
            alert("group deleted successfully");
            // window.location.href = '/'
        }).catch(function (error) {
            alert("this isn't your group to delete");
        });
    }
    

    render(){
        return (
            <div className="card bg-dark text-white" key={this.state.group.id}>
                <h2 className="card-header text-white">{this.state.group.name}
                </h2>
                <div className="card-body">
                <p className="card-text">{this.state.group.overview}</p>
                <button onClick={this.delete} className="btn btn-outline-danger float-right m-2">Delete Group</button>
                <Link to={`/groupusers/${this.state.group.id}`}><button className="btn btn-outline-success float-right m-2">See Users</button></Link>
                <Link to={`/groupapprove/${this.state.group.id}`}><button className="btn btn-outline-success float-right m-2">Approve Users</button></Link>
            </div>
</div>
        )
    }
}

export default GroupComponent;