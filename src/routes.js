import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Profile from "./components/Profile"
import SigninPage from "./components/SigninPage"
import App from "./components/App"
import requireAuth from "./utils/requireAuth"
import TwinpalProfile from './components/TwinpalProfile'
import Newsfeed from "./components/Newsfeed"

export default () =>
    (   <BrowserRouter>
            <div>
                <App>
                    <Switch>
                        <Route exact path="/" component={requireAuth(Newsfeed)}/>
                        <Route exact path="/profile" component={requireAuth(Profile)}/>
                        <Route path="/signin" component={SigninPage}/>
                        <Route path="/twinpal/:id" component={TwinpalProfile}/>

                    </Switch>
                </App>


            </div>
        </BrowserRouter>
    )