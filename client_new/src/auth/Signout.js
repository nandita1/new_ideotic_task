import React, {Component} from 'react'
import { connect } from 'react-redux';
import * as actions from '../store/actions/index'
import {  Redirect } from "react-router-dom";

class Signout extends Component {
    componentDidMount(){
        this.props.logout()
    }
    render() {
        return <Redirect to="/"></Redirect>
    }
}

const mapDispatchToProps = dispatch => {
    return{
        logout: () => dispatch(actions.authSignout())
    }
}

export default connect(null, mapDispatchToProps)(Signout)