import React from "react";
import Menu from './Menu';
import { API } from "../config";
import Posts from './Posts'
import {Link} from 'react-router-dom'
import classes from './Home.module.css'
const Home = () => (
  <div>
    <Menu></Menu>
    <div className={classes.jumbotron}>
      <div className={classes.container}>
      <h1>Geek Blogs</h1>
      <p className={classes.lead}>Welcome to the Geek World</p>
      <Link to="/create/post" className={classes.btn}>Create Post</Link>
      </div>   
    </div>
    <div>
      <Posts></Posts>
    </div>
  </div>
);

export default Home;