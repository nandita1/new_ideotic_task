import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './core/Home';
import Signup from './auth/Signup'
import Signin from './auth/Signin'
import Signout from './auth/Signout'
import Post from './core/Post'
import PrivateRoute from './auth/PrivateRoute'
import CreatePost from './core/CreatePost'

const Routes = () => {

        return (
       
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                        <Route path="/signup" exact component={Signup}></Route>
                        <Route path="/signin" exact component={Signin}></Route>
                        <Route path="/signout" exact component={Signout}></Route>
                        <Route path="/post/:postId" exact component={Post}></Route>
                        <PrivateRoute path="/create/post" exact component={CreatePost} />
                </Switch>
            </BrowserRouter>
        

    )
    
}

export default Routes;