import React from "react";
import Post from "../Post/Post";
import LoadingCube from "./LoadingCube/LoadingCube";

class NewsFeed extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            loading: false,
            animation: false,
            token: JSON.parse(localStorage.getItem("token")).token,
        };
    }

    async componentDidMount() {
        this.setState({loading: true, animation: true});
        let res = await fetch("http://localhost:8000/api/posts/", {
            method: "GET",
            headers: {
                Authorization: `Token ${this.state.token}`,
            },
        });
        if(res.statusText === 'Unauthorized'){
            localStorage.clear();
            window.location.href = '/login'
        }
        let resJson = await res.json();
        if (resJson) {
            this.setState({posts: resJson, loading: false});
        }
        setTimeout(()=>{
            this.setState({animation: false})
        },3000)

    }

    render() {
        if (this.state.animation){
            return (
                <div className="h-100 d-flex justify-content-center align-items-center" style={{top: '150px'}}>
                    <LoadingCube />
                </div>
            );
        }
        if (this.state.posts.length === 0) {
            return (
                <>
                    <h2 style={{textAlign: 'center', marginTop: '50px', fontStyle: 'oblique', color: 'red'}}>you don't
                        have
                        posts yet, try to create one</h2>
                </>
            );
        }
        return (
            <div className="col-sm-12">
                {!this.state.loading && (
                    this.state.posts.map((item) => {
                        return (
                            <div key={item.id}>
                                <Post key={item.id} post={item}/>
                                <br/>
                            </div>
                        );
                    })
                )}
                <br/><br/>
            </div>
        );
    }
}

export default NewsFeed;
