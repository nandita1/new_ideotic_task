import React, { Fragment, Component} from "react";
import { Link, withRouter } from "react-router-dom";
//import Navbar from "react-bootstrap/Navbar";
//import Nav from "react-bootstrap/Nav";
import classes from './Menu.module.css'
import {connect} from 'react-redux'
//withRouter for props history
//import { signout, isAuthenticated } from "../auth";

class Menu extends Component {
  isActive = (history, path) => {
    if (history.location.pathname === path) return [classes.link, classes.active].join(" ");
    return classes.link;
  };
  render(){
    return(


      <ul>
        <li><Link className={this.isActive(this.props.history, "/")} to="/">Home</Link></li>
        {!this.props.isAuthenticated && (<Fragment>
          <li><Link className={this.isActive(this.props.history, "/signin")} to="/signin">Signin</Link></li>
        <li><Link className={this.isActive(this.props.history, "/signup")} to="/signup">Signup</Link></li>
        </Fragment>)}
        {this.props.isAuthenticated && 
        <li><Link className={this.isActive(this.props.history, "/signout")} to="/signout">Signout</Link></li>}
      </ul>



    )
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps)(Menu));
/*

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
  </Navbar>*/