import React, {Component} from 'react';
import Menu from './Menu';
import {API} from '../config'
import classes from './Post.module.css'
import {connect} from 'react-redux'
 
class Post extends Component {
    state = {
        post: {},
        error: false
    }


    componentDidMount(){
        const postId = this.props.match.params.postId;
        fetch(`${API}/post/${postId}`,{
            method: "GET",
          })
            .then((response) => {
                
              return response.json()
            })
            .then((response) => {
                
                console.log(response)
                this.setState({...this.state, post: {...this.state.post, _id: response._id, title: response.title, description: response.description, createdAt: response.createdAt, author: response.author.name, likes: response.likes}, error: false})
                //console.log(this.state.post)
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
              this.setState({...this.state, post: {...this.state.post, likes: newLikes}})
              response.json()
            })
          .catch(err => console.log(err))
    }

    showLikeButton = () => {
        if(this.props.token === null)
            return <button disabled type="button" className="btn btn-secondary" style={{pointerEvents: 'none'}}>Like</button>
        return <button type="button" className="btn btn-danger" onClick={() => this.incrementLike()}>Like</button>
    }

    render(){
        return (
            <div>
                <Menu></Menu>
                <div className={classes.article}>
                    <div className="container">
                            <div className="row">
                                <div className="col-lg-10 col-xl-8 offset-lg-1 offset-xl-2">
                                    <div className={classes.intro}>
                                        <h1 className="text-center">{this.state.post.title}</h1>
                                        <p className="text-center"><span className={classes.by}>- by {this.state.post.author}</span></p>
                                        <p className="text-center"><span className={classes.date}>{this.state.post.createdAt} </span></p>
                                        <img className="img-fluid" src={`${API}/posts/photo/${this.state.post._id}`}/></div>
                                        <p className="text-center">
                                            <span><i className='fas fa-heart' style={{color: 'red'}}></i> {this.state.post.likes} Likes</span>
                        
                                        </p>
        <p className="text-center">{this.showLikeButton()}</p>
                                    <div className={classes.text} dangerouslySetInnerHTML={{__html:this.state.post.description}}></div>
                                        </div>
                                        </div>
                                    </div>
                        
                                </div>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.id
    }
}

export default connect(mapStateToProps)(Post)