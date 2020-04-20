import React, {Component} from 'react';
import Menu from '../Menu/Menu';
import {API} from '../../config'
import classes from './Post.module.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../Spinner/Spinner'
 
class Post extends Component {
    state = {
        post: {},
        error: false,
        disabled: false,
        loading: false
    }


    componentDidMount(){
        this.setState({...this.state, loading: true})
        const postId = this.props.match.params.postId;
        fetch(`${API}/post/${postId}`,{
            method: "GET",
          })
            .then((response) => {
                
              return response.json()
            })
            .then((response) => {
                let disabled = false
                console.log(response)
                for( let i in this.props.likedPosts){
                    //console.log(likedPost)
                    console.log(response._id)
                    console.log(this.props.likedPosts[i])
                    if(this.props.likedPosts[i] == response._id)
                        disabled = true
                }
                this.setState({...this.state, loading: false, disabled: disabled,post: {...this.state.post, _id: response._id, title: response.title, description: response.description, createdAt: response.createdAt, author: response.author.name, likes: response.likes}, error: false})

            })
            .catch((err) => {
                this.setState({...this.state, error: err})
              console.log(err)
            })
    }

    incrementLike = () => {
        const postId = this.props.match.params.postId;
        const bearer = 'Bearer ' + this.props.token;
        fetch(`${API}/post/like/${postId}/${this.props.userId}`,{
            method: "PUT",
            headers: {
                'Authorization' : bearer
            }
          })
          .then(response => {
              console.log(response)
              const newLikes = this.state.post.likes + 1
              this.props.likePost(postId)
              this.setState({...this.state, disabled: true, post: {...this.state.post, likes: newLikes}})
              console.log(this.state)
            })
          .catch(err => console.log(err))
    }

    showLikeButton = () => {
        if(this.props.token === null || this.state.disabled)
            return <button disabled type="button" className={[classes.btn, classes.disabled].join(" ")} style={{pointerEvents: 'none'}}>Like</button>
        return <button type="button" className={classes.btn} onClick={() => this.incrementLike()}>Like</button>
    }

    render(){
        let content  = (<div className={classes.article}>
            <div className={classes.container}>
                    <div className="row">
                        <div className="col-lg-10 col-xl-8 offset-lg-1 offset-xl-2">
                            <div className={classes.intro}>
                                <h1 style={{textAlign: 'center'}}>{this.state.post.title}</h1>
                                <p style={{textAlign: 'center'}}><span className={classes.by}>- by {this.state.post.author}</span></p>
                                <p style={{textAlign: 'center'}}><span className={classes.date}>{this.state.post.createdAt} </span></p>
                                <img style={{width: '100%', height: 'auto'}} src={`${API}/posts/photo/${this.state.post._id}`}/></div>
                                <p style={{textAlign: 'center'}}>
                                    <span><i className='fas fa-heart' style={{color: 'red'}}></i> {this.state.post.likes} Likes</span>
                
                                </p>
                                <p style={{textAlign: 'center'}}>{this.showLikeButton()}</p>
                            <div className={classes.text} dangerouslySetInnerHTML={{__html:this.state.post.description}}></div>
                                </div>
                                </div>
                            </div>
                
                        </div>)
        if(this.state.loading)
            content= <Spinner></Spinner>
        return (
            <div>
                <Menu></Menu>
                {content}
            </div>
            
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        likePost: (postId) => dispatch(actions.likePost(postId))
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.id,
        likedPosts: state.auth.likedPosts
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)