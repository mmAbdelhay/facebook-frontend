import React from 'react';
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import axios from 'axios';
import {Link} from "react-router-dom";

class JoinGroupComponent extends React.Component{

    constructor(props){
        super();
        this.state={
            group:props.group,
            token:JSON.parse(localStorage.getItem("token")).token,
        };
    }


    request = (e) => {
        console.log(this.state.group)
        e.preventDefault();
        axios.post(`http://localhost:8000/api/groups/join`, {
            GID: this.state.group.id
        },{
            headers: {
                'Authorization': `token ${this.state.token}`
            }
        }).then(function (response) {
            console.log(response.data);
            alert("request sent successfuly successfully");
            // window.location.href = '/'
        }).catch(function (error) {
            
            alert("this group doesn't accept members right now , try again later");
        });
    }
    

    render(){
        return (
            <div className="card bg-dark text-white" key={this.state.group.id}>
                <h2 className="card-header text-white">{this.state.group.name}
                </h2>
                <div className="card-body">
                <p className="card-text">{this.state.group.overview}</p>
                <button onClick={this.request} className="btn btn-outline-primary float-right m-2">Request to join</button>
                </div>
            </div>
        )
    }
}

export default JoinGroupComponent;