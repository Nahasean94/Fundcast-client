import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Profile from "./components/Profile"
import SigninPage from "./components/SigninPage"
import App from "./components/App"
import requireAuth from "./utils/requireAuth"
import PodcastPage from './components/podcasts/PodcastPage'
import Home from "./components/Home"
import TestPage from "./components/TestPage"
import Hosts from "./components/hosts/Hosts"
import TagsPage from "./components/podcasts/TagsPage"
import HostPage from "./components/hosts/HostPage"

export default () => {

    return (<BrowserRouter>
            <div>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/profile" component={requireAuth(Profile)}/>
                        <Route path="/signin" component={SigninPage}/>
                        <Route path="/podcasts/:id" component={PodcastPage}/>
                        <Route path="/hosts/:id" component={HostPage}/>
                        <Route path="/hosts" component={Hosts}/>
                        <Route path="/tags" component={TagsPage}/>
                        <Route path="/test" component={TestPage}/>
                    </Switch>
                </App>


            </div>
        </BrowserRouter>
    )
}