import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {API} from '../config'

import * as actions from '../store/actions/index'

class Posts extends Component {

    componentDidMount(){
        this.props.fetchPosts()
    }
    render(){
        return(
            <div className="container">
            { this.props.posts.map((post,i)=> (
                <div className="card mb-3" key = {i}>
                <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={`${API}/posts/photo/${post._id}`} style={{height: '100%'}} className="card-img" alt="..."/>
                </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <p className="card-text"><small className="text-muted">{post.createdAt}</small></p>
                      <Link to={`/post/${post._id}`} className="btn btn-danger">Read More</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))} 
            

            </div>
            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchPosts: () => dispatch(actions.fetchPostsMain())
    }
}

const mapStateToProps = state => {
    return{
        posts: state.posts.posts
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Posts)