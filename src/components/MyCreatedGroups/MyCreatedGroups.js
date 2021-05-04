import React from 'react';
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import GroupComponent from '../GroupComponent/GroupComponent';

class MyCreatedGroups extends React.Component{

    constructor(){
        super();
        this.state={
            groups:[],
            loading:false,
            token:JSON.parse(localStorage.getItem("token")).token,
        };
    }

    async componentDidMount(){
        const [loginStatus, loginToken] = checkIfLoggedIn();
        if (loginStatus) {
            this.setState({
                loading:true
            });
            console.log(this.state.token);
            let res= await fetch("http://localhost:8000/api/groups/createdbyyou",{
                method:"GET",
                headers:{
                    Authorization: `Token ${this.state.token}`,
                }
            });
            let resJson = await res.json();
            this.setState({groups:resJson,loading: false});
        } else {
            window.location.href = '/login'
        }
 
    }

    render(){
        if (this.state.groups.length === 0){
            return (
                <h2 style={{textAlign: 'center', marginTop: '50px', fontStyle: 'oblique', color: 'red'}}>you don't have posts yet, try to create one</h2>
            );
         }
         return (
            <div className="col-sm-12">
               {!this.state.loading ? (
                  this.state.groups.map((item) => {
                     return (
                        <div key={item.id}>
                           <GroupComponent key={item.id} group={item} />
                           <br />
                        </div>
                     );
                  })
               ) : (
                  <div>Posts is loading ...</div>
               )}
            </div>
         );
    }
}

export default MyCreatedGroups;