import React, {Component} from 'react'
import Menu from './Menu'
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {connect } from 'react-redux'
import {API} from '../config'
import {Redirect} from 'react-router-dom'

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
          editorState: EditorState.createEmpty(),
          title: '',
          photo: '',
          success: false,
          error: false,
          formData: new FormData()
        };
      }

      componentDidMount(){
          this.setState({...this.state, formData: new FormData()})
      }
    
      onEditorStateChange = (editorState) => {
        this.state.formData.set('description',draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
          console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())))
        this.setState({
          editorState,
        });
      };

      inputChangeHandler = (event, name) => {
        //if((FormData in window) && FormData.hasOwnProperty('append'))
            this.state.formData.set(name,event.target.value)

        console.log(this.state.formData)
        this.setState({...this.state, title: event.target.value})
      }

      fileAccept = (event, name) => {
        this.state.formData.set(name,event.target.files[0])
        console.log(this.state.formData)
        this.setState({...this.state, photo: event.target.files[0]})
      }

      clickSubmit = (event) => {
        event.preventDefault()
        this.state.formData.set('author', this.props.userId)
        const bearer = 'Bearer ' + this.props.token;
        fetch(`${API}/post/create/${this.props.userId}`,{
            method: "POST",
            headers: {
                'Authorization' : bearer
            },
            body: this.state.formData
          })
          .then(response => {
              this.setState({...this.setState, success: true, error: false})
              response.json()
            })
          .catch(err => {
            this.setState({...this.setState, success: false, error: err})
          })

      }

      showError = () => (
        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>
      );
    
      showSuccess = () => {
        if(this.state.success){
          return <Redirect to="/"></Redirect>
        }
      }
    
    render(){
        const { editorState } = this.state;
        return (
        <div>

            <Menu></Menu>
            {this.showError()}
            {this.showSuccess()}
            <div className="container">
            <Form>
          <Form.Group >
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(event) => this.inputChangeHandler(event, 'title')}
              type="text"
              placeholder="Enter title"
              value={this.state.title}
            />
          </Form.Group>
          
            <Form.Group >
            <Form.Label>Title</Form.Label>
            <Form.Control
                onChange= {(event) => this.fileAccept(event, 'photo')}
              type="file"
              accept="image/*"
            />
          </Form.Group>
            <Button onClick={(event) => this.clickSubmit(event)} variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        
            </div>
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
            />
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

export default connect(mapStateToProps)(CreatePost)