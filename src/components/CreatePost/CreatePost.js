import React from 'react';
import './CreatePost.css'

class CreatePost extends React.Component {
    constructor() {
        super();
        this.state = {
            token: '72d83d84784a999e207cf766babfb9f189cd06b9',
            username:'',
            password:'',
            email:''
        }
    }

    setUsername = (e)=>{
        this.setState({username:e.target.value})
    }

    createPost = async (e)=>{
        let user = {
            email : this.state.email,
            password: this.state.password
        }
        let res = await fetch('https://reqres.in/api/login',{
            method:'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(user)
        });
        let resJson = res.json();
        if (resJson.token){
            alert('login succes')
        }else{
            alert('user not found')
        }
    }


    render() {
        return (
            <form>
                <div className="form-group">
                    <input type="text" class="form-control" name="content"/>
                    <input type="file" class="form-control" name="postImg"/>
                </div>
                <button className="btn btn-block btn-outline-success" onClick={this.createPost}>Login</button>
            </form>
        )
    }
}

export default CreatePost;
