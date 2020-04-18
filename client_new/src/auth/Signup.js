import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index'
import { Link } from "react-router-dom";
import Menu from "../core/Menu";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Auth extends Component {
    state = {
        name: "",
        email: "",
        password: "",
    }
    inputChangeHandler = (event, name) => {
        //setValues({ ...values, error: false, [name]: event.target.value });
        const updatedControls = {
            ...this.state.controls,
            [name]: event.target.value
        };
        this.setState(updatedControls)
    };

    clickSubmit = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.name, this.state.email, this.state.password)
    }

    signupForm = () => (
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(event) => this.inputChangeHandler(event, "name")}
              type="text"
              placeholder="Enter Name"
              value={this.state.name}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(event) => this.inputChangeHandler(event, "email")}
              type="email"
              placeholder="Enter email"
              value={this.state.email}
            />
          </Form.Group>
    
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(event) => this.inputChangeHandler(event, "password")}
              type="password"
              placeholder="Password"
              value={this.state.password}
            />
          </Form.Group>
          <Button onClick={this.clickSubmit} variant="primary" type="submit">
            Submit
          </Button>
        </Form>)

showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: this.props.error ? "" : "none" }}
    >
      {this.props.error}
    </div>
  );
 showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: this.props.success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );


    render(){
        return(
            <div>
                <Menu></Menu>
                {this.showError()}
                {this.showSuccess()}
                {this.signupForm()}
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        success: state.auth.successSignup,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (name, email, password) => dispatch(actions.authSignup(name, email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)