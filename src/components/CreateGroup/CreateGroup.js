import React from 'react';
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import axios from 'axios';


class CreateGroup extends React.Component{

    constructor(){
        super();
        this.state={
            name:"",
            overview:"",
            token:JSON.parse(localStorage.getItem("token")).token
        };
    }

    addGroup=()=>{
        console.log(this.state);
        axios.post('http://localhost:8000/api/groups/create', {
            overview: this.state.overview,
            name:this.state.name
        }, {
            headers: {
                'Authorization': `token ${this.state.token}`
            }
        }).then(function (response) {
            console.log(response.data);
            window.location.href = '/mycreatedgroups';
        }).catch(function (error) {
            alert(error);
        });
    }


    render(){
        return(
        <div className="container mt-5">
            <div className="card bg-dark">
            <div className="card-header h2">
                Create Group :
            </div>
                <div className="card-body">
                    <div className="form-group">
                        <label for="groupname">Group Name</label>
                        <input type="text" className="form-control" id="groupname" placeholder="Name" onChange={(e)=>this.setState({name:e.target.value})} value={this.state.name}></input>
                    </div>
                    <div className="form-group">
                        <label for="groupoverview">Overview</label>
                        <textarea className="form-control" id="groupoverview" rows="4" placeholder="write group overview here" onChange={(e)=>this.setState({overview:e.target.value})} value={this.state.overview}></textarea>
                    </div>

                    <button className="btn btn-primary" onClick={this.addGroup}>Create</button>
                </div>
            </div>
        </div>
        )
    }
}

export default CreateGroup;