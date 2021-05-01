import React from 'react';
import Post from '../Post/Post'

class NewsFeed extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            loading: false,
            //it should be passed from props according to user logged in
            token: '72d83d84784a999e207cf766babfb9f189cd06b9'
        }
    }

    async componentDidMount() {
        this.setState({loading: true});
        let res = await fetch("http://localhost:8000/api/posts/", {
            method: 'GET',
            headers: {
                'Authorization': `Token ${this.state.token}`,
            }
        });

        let resJson = await res.json();
        console.log(res);
        this.setState({posts: resJson, loading: false});
    }

    render() {
        return (
            <div className="col-sm-6">
                {!this.state.loading ? this.state.posts.map((item) => {
                    return (
                        <>
                            <Post key={item.id} post={item}/>
                            <br/>
                        </>
                    )
                }) : <div>Posts is loading ...</div>}
            </div>
        )
    }
}

export default NewsFeed;
