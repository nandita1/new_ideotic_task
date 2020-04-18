import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index'
import { Redirect } from "react-router-dom";
import Menu from "../core/Menu";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Signin extends Component {
    state = {
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
        event.preventDefault();
        this.props.onAuth( this.state.email, this.state.password)
    }

    signupForm = () => (
        <Form>
          <Form.Group controlId="formBasicEmail">
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
          <Button onClick={(event) => this.clickSubmit(event)} variant="primary" type="submit">
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

  showSuccess = () => {
    if(this.props.success){
      return <Redirect to="/"></Redirect>
    }
  }
  

  showLoading = () =>
  this.props.loading && (
    <div className="alert alert-info">
      <h2>Loading...</h2>
    </div>
  );
    render(){
        return(
            <div>
                <Menu></Menu>
                {this.showLoading()}
                {this.showError()}
                {this.showSuccess()}
                {this.signupForm()}
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        success: state.auth.successSignin,
        error: state.auth.error 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password) => dispatch(actions.authSignin( email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)