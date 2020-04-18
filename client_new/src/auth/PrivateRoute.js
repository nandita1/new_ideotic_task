import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import {connect} from 'react-redux'

class PrivateRoute extends Component {
    
    render(){
        const Component = this.props.component;
        const isAuthenticated = this.props.token !== null
        console.log(isAuthenticated)
        const props = this.props;
        return (
            <Route
            render={props =>
                isAuthenticated ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/signin",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
        )
    }
}

const mapStateToProps = state => {
    return {
        token : state.auth.token
    }
}


export default connect(mapStateToProps)(PrivateRoute);
