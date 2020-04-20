import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index'
import { Link,Redirect } from "react-router-dom";
import Menu from "../core/Menu/Menu";
import classes from './auth.module.css'


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
        
        <form className={classes.container}>
          <label>Name</label>
            <input
              onChange={(event) => this.inputChangeHandler(event, "name")}
              type="text"
              placeholder="Enter Name"
              value={this.state.name}
            />
        <label>Email address</label>
        <input
          onChange={(event) => this.inputChangeHandler(event, "email")}
          type="email"
          placeholder="Enter email"
          value={this.state.email}
        />

        <label>Password</label>
        <input
          onChange={(event) => this.inputChangeHandler(event, "password")}
          type="password"
          placeholder="Password"
          value={this.state.password}
        />
      <button onClick={(event) => this.clickSubmit(event)} type="submit">
        Submit
      </button>
    </form>
        
        )


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
        success: state.auth.success,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (name, email, password) => dispatch(actions.authSignup(name, email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)