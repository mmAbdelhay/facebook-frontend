import React from 'react';
import {checkIfLoggedIn} from "../../Service/CheckUserStatus";
import GroupApproveComponent from '../GroupApproveComponent/GroupApproveComponent';
import GroupComponent from '../GroupComponent/GroupComponent';


class GroupApprove extends React.Component{

    constructor(props){
        super(props);
        this.state={
            users:[],
            loading:false,
            token:JSON.parse(localStorage.getItem("token")).token,
            gid:this.props.match.params.id
        };
    }

    async componentDidMount(){
        const [loginStatus, loginToken] = checkIfLoggedIn();
        let gid = this.props.match.params.id;
        if (loginStatus) {
            this.setState({
                loading:true
            });
            console.log(this.state.token);
            let res= await fetch(`http://localhost:8000/api/groups/pendings/${gid}`,{
                method:"GET",
                headers:{
                    Authorization: `Token ${this.state.token}`,
                }
            });
            let resJson = await res.json();
            this.setState({users:resJson,loading: false});
        } else {
            window.location.href = '/login'
        }
 
    }


    render(){
        if (this.state.users.length === 0){
            return (
                <h2 style={{textAlign: 'center', marginTop: '50px', fontStyle: 'oblique', color: 'red'}}>No users in group</h2>
            );
         }
         return (
            <div className="col-sm-12">
               {!this.state.loading ? (
                  this.state.users.map((item) => {
                     return (
                        <div key={item.id}>
                           <GroupApproveComponent key={item.id} user={item} gid={this.state.gid} />
                           <br />
                        </div>
                     );
                  })
               ) : (
                  <div>Users are loading ...</div>
               )}
            </div>
        // return (
        //     <div>helloooooooooo</div>
         );
    }
}

export default GroupApprove;