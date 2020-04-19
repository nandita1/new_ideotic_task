import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import {API} from '../config'
import classes from './Posts.module.css'

import * as actions from '../store/actions/index'

class Posts extends Component {

    componentDidMount(){
        this.props.fetchPosts()
    }
    render(){
        return(
            <div className={classes.container}>
              <div className={classes.row}>
              { this.props.posts.map((post,i)=> (
                <div className={classes.column} key = {i}>
                  <div className={classes.card}>
                    <div className={classes.image}>
                      <img src={`${API}/posts/photo/${post._id}`} alt="..."/>
                    </div>
                      <h5 className="card-title">{post.title}</h5>
                    <p className="card-text"><small className="text-muted">{post.createdAt}</small></p>
                    
                    <Link to={`/post/${post._id}`} className={classes.btn}>Read More</Link>
                    </div>
                  </div>
                
            ))} 
              </div>
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