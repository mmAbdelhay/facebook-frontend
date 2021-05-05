import React from "react";
import MyGroupsComponent from "../MyGroupsComponent/MyGroupsComponent"
import {Link} from "react-router-dom";
class MyGroups extends React.Component {
   constructor() {
      super();
      this.state = {
         groups: [],
        
         loading: false,
         token: JSON.parse(localStorage.getItem("token")).token,
      };
   }

   async componentDidMount() {
      console.log(this.state.token);
      this.setState({ loading: true });
      let res = await fetch("http://localhost:8000/api/groups/list/", {
         method: "GET",
         headers: {
            Authorization: `Token ${this.state.token}`,
         },
      });
      let resJson = await res.json();
      if(resJson) {
         this.setState({groups: resJson, loading: false});
      }
   }

   render() {
      if (this.state.groups.length === 0){
         return (
             <h2 style={{textAlign: 'center', marginTop: '50px', fontStyle: 'oblique', color: 'red'}}>you don't join groups yet, try to join one</h2>
         );
      }
      return (
        <div className="container">
           {!this.state.loading ? (
              this.state.groups.map((item) => {
                 return (
                   <div className="col-sm-12">
                   <div className="card" style={{width: '18rem',backgroundColor: '#484d4f'}} key={item.id}>
                   <div className="card-body">
                     <h5 className="card-title">{item.name}</h5>
                     <p className="card-text">{item.overview}</p>
                     {/* <Link to={`/groupusers/${this.state.group.id}`}><button className="btn btn-outline-success float-right m-2">visit group</button></Link> */}
                   </div>
                 </div>
                 </div>
                 );
              })
           ) : (
              <div>groups are loading ...</div>
           )}
        
        </div>
      );
   }
}

export default MyGroups;
