import React from "react";
import Menu from './Menu';
import { API } from "../config";
import Posts from './Posts'
import {Link} from 'react-router-dom'
const Home = () => (
  <div>
    <Menu></Menu>
    <div className="jumbotron">
      <h2>Geek Blogs</h2>
      <p className="lead">Welcome to the Geek World</p>
      <Link to="/create/post" className="btn btn-danger">Create Post</Link>
    </div>
    <div>
      <Posts></Posts>
    </div>
  </div>
);

export default Home;