import React, { Fragment, Component} from "react";
import { Link, withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {connect} from 'react-redux'
//withRouter for props history
//import { signout, isAuthenticated } from "../auth";

class Menu extends Component {
  isActive = (history, path) => {
    if (history.location.pathname === path) return "active";
    return "";
  };
  render(){
    return(
      <Navbar bg="danger" variant="dark">
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/" className={this.isActive(this.props.history, "/")}>
        Home
      </Nav.Link>
        {!this.props.isAuthenticated && (<Fragment>
          <Nav.Link
            as={Link}
            to="/signin"
            className={this.isActive(this.props.history, "/signin")}
          >
            Signin
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/signup"
            className={this.isActive(this.props.history, "/signup")}
          >
            Signup
          </Nav.Link>
        </Fragment>)}
        {this.props.isAuthenticated && <Nav.Link
            as={Link}
            to="/signout"
            className={this.isActive(this.props.history, "/signout")}
          >
            Signout
          </Nav.Link>}
        
    </Nav>
  </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps)(Menu));
