import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
import Auth from "./users/pages/Auth";
import {AuthContext} from "./shared/context/auth-context";
import {useAuth} from "./shared/hooks/auth-hook";
import AllPosts from "./posts/pages/AllPosts";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import NewPost from "./posts/pages/NewPost";
import NewAdminPost from "./posts/pages/NewAdminPost";
import UpdateAdminPost from "./posts/pages/UpdateAdminPost";
import Profile from "./users/pages/Profile";
import UserPosts from "./posts/pages/UserPosts";
import UpdatePost from "./posts/pages/UpdatePost";
import UpdateUser from "./users/pages/UpdateUser";



const App = () => {
    const {token, login, logout, userId, isAdmin} = useAuth()

    let routes;

    if (token && !isAdmin) {
        routes = (
            <Switch>
                <Route path="/" exact={true}>
                    <AllPosts/>
                </Route>

                <Route path="/users/:userId">
                    <Profile/>
                </Route>

                <Route path="/:userId/posts">
                    <UserPosts/>
                </Route>

                <Route path="/posts/new" exact={true}>
                    <NewPost/>
                </Route>

                <Route path="/posts/:postId" exact={true}>
                    <UpdatePost/>
                </Route>

                <Route path="/update/:userId">
                    <UpdateUser/>
                </Route>

                <Redirect to='/'/>
            </Switch>
        );
    }else if(token && isAdmin) {
        routes = (
            <Switch>
                <Route path="/" exact={true}>
                    <AllPosts/>
                </Route>

                <Route path="/users" exact={true}>

                </Route>

                <Route path="/users/:userId">
                    <Profile/>
                </Route>

                <Route path="/:userId/posts">
                    <UserPosts/>
                </Route>

                <Route path="/posts/new" exact={true}>
                    <NewAdminPost/>
                </Route>

                <Route path="/posts/:postId" exact={true}>
                    <UpdateAdminPost/>
                </Route>

                <Redirect to='/'/>
            </Switch>
        );
    } else {
        routes = (
            <Switch>
                <Route path="/" exact={true}>
                    <AllPosts/>
                </Route>

                <Route path="/:userId/posts">

                </Route>

                <Route path="/auth" exact={true}>
                    <Auth/>
                </Route>

                <Redirect to='/auth'/>
            </Switch>
        );
    }


    return <AuthContext.Provider value={{
        isLoggedIn: !!token,
        token: token,
        userId,
        isAdmin,
        login,
        logout
    }}>
        <Router>
            <MainNavigation/>
            <main>{routes}</main>
        </Router>
    </AuthContext.Provider>

};

export default App;
