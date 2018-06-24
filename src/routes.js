import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Profile from "./components/Profile"
import SigninPage from "./components/SigninPage"
import App from "./components/App"
import requireAuth from "./utils/requireAuth"
import TwinpalProfile from './components/TwinpalProfile'
import Home from "./components/Home"

export default () => {

    return (<BrowserRouter>
            <div>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/profile" component={requireAuth(Profile)}/>
                        <Route path="/signin" component={SigninPage}/>
                        <Route path="/podcast/:id" component={TwinpalProfile}/>
                    </Switch>
                </App>


            </div>
        </BrowserRouter>
    )
}