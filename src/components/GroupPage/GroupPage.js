import React from "react";
import Post from "../Post/Post";
import LoadingCube from "../NewsFeed/LoadingCube/LoadingCube";
import axios from "axios";
import sobhy from '../CreatePost/sobhy.jpeg';

import {
    ThumbsdownIcon,
    ThumbsupIcon,
    CommentDiscussionIcon,
    XCircleFillIcon,
    ArrowRightIcon,
    PinIcon, PencilIcon
} from '@primer/octicons-react'

class GroupPage extends React.Component {
    constructor() {
        super();
        this.state = {
            groupdata: '',
            loading: false,
            animation: false,
            gid: '',
            token: JSON.parse(localStorage.getItem("token")).token,
        };
    }

    async componentDidMount() {
        let gid = this.props.match.params.gid
        this.setState({loading: true, animation: true});
        let res = await fetch(`http://localhost:8000/api/groups/${gid}`, {
            method: "GET",
            headers: {
                Authorization: `Token ${this.state.token}`,
            },
        });
        let resJson = await res.json();
        if (resJson) {
            this.setState({groupdata: resJson, loading: false});
            console.log(resJson)
        }

        setTimeout(()=>{
            this.setState({animation: false})
        },3000)

    }
    setContent = (e) => {
        this.setState({content: e.target.value});
    };

    handleChange2 = (event) => {
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(event.target.value)) {
            alert('Invalid file type');
            event.target.value = '';
            return false;
        } else {
            console.log(event.target.files[0])
            this.setState({file: event.target.files[0]})
        }
    }

    create = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', this.state.content);
        if(this.state.file){
            formData.append('postImg', this.state.file)
        }
        console.log(formData)
        formData.append('group_ID',this.state.groupdata.GroupData.id)
        axios.post('http://localhost:8000/api/posts/create', formData, {
            headers: {
                'Authorization': `Token ${this.state.token}`
            }
        }).then(function (response) {
            alert("post created successfully");
            window.location.href = `/grouppage/${this.state.groupdata.GroupData.id}`
        }).catch((error) => {
            // if (error.response.data.error) {
            //     this.setState({error: error.response.data.error})
            window.location.href = `/grouppage/${this.state.groupdata.GroupData.id}`

            // }
        });
    }

    addPost = (e) => {
        if (this.state.comment !== '') {
            e.preventDefault();
            axios.post(`http://localhost:8000/api/posts/addComment`, {
                content: this.state.comment,
                postID: this.state.post.id,
                
            }, {
                headers: {
                    'Authorization': `Token ${this.state.token}`
                }
            }).then(function (response) {
                console.log(response.data);
                window.location.href = `/grouppage/${this.state.groupdata.GroupData.id}`
            }).catch((error) => {
                if (error.response.data.error) {
                    this.setState({error: error.response.data.error})
                }
            });
        } else {
            console.log('no changes')
        }
    }

    render() {
        // console.log(this.state.groupdata)
        if (this.state.animation){
            return (
                <div className="h-100 d-flex justify-content-center align-items-center" style={{top: '150px'}}>
                    <LoadingCube />
                </div>
            );
        }
        if (this.state.groupdata.length === 0) {
            return (
                <>
                    <div>
                        {/* <p>{this.state.groupdata.GroupData.name}</p> */}
                    </div>
                    <h2 style={{textAlign: 'center', marginTop: '50px', fontStyle: 'oblique', color: 'red'}}>you don't
                        have
                        posts yet, try to create one</h2>
                        {/* <button className="btn btn-outline-secondary" type="button" onClick={this.addComment}>
                                <ArrowRightIcon size={18}/></button> */}
                </>
            );
        }
       
       
        return (
            
            <div className="col-sm-12">
                 <div class='fixed' id="plus">
                    <button type="button" class="kc_fab_main_btn" data-toggle="modal" data-target="#exampleModal">+
                        <div class="s">post</div>
                    </button>
                </div>

                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div id="modal" className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create post</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.state.error && (<div className="row">
                                    <div className="col-8">
                                        <h4 style={{color: 'red'}}>{this.state.error}</h4>
                                    </div>
                                    <div className='col-4'>
                                        <img src={sobhy} alt="4ortet el a5la2"/>
                                    </div>
                                </div>)}
                                <textarea onChange={this.setContent} cols="57" rows="5" placeholder=" type your content"
                                          id="createPost" value={this.state.content}/>
                                <input type="file" onChange={this.handleChange2}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Close
                                </button>
                                <button type="button" onClick={this.create} className="btn btn-outline-success">Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                        <p>{this.state.groupdata.GroupData.name}</p>
                    </div>
                    <div>
                        <p>{this.state.groupdata.GroupData.overview}</p>
                    </div>
                {!this.state.loading && (
                    this.state.groupdata.postsData.map((item) => {
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

export default GroupPage;
