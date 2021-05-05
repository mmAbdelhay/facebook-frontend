import React from "react";
import Post from "../Post/Post";
import ThreeDotsWave from "./ThreeDotsWave";

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
        let resJson = await res.json();
        if (resJson) {
            this.setState({posts: resJson, loading: false});
        }
        setTimeout(()=>{
            this.setState({animation: false})
        },2000)

    }

    render() {
        if (this.state.animation){
            return (
                <div className="h-100 d-flex justify-content-center align-items-center">
                    <ThreeDotsWave/>
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
