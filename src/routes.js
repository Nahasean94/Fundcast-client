import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Profile from "./components/Profile"
import SigninPage from "./components/SigninPage"
import App from "./components/App"
import requireAuth from "./utils/requireAuth"
import PodcastPage from './components/podcasts/PodcastPage'
import Home from "./components/Home"
import Hosts from "./components/hosts/Hosts"
import TagsPage from "./components/podcasts/TagsPage"

export default () => {

    return (<BrowserRouter>
            <div>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/profile" component={requireAuth(Profile)}/>
                        <Route path="/signin" component={SigninPage}/>
                        <Route path="/podcasts/:id" component={PodcastPage}/>
                        <Route path="/hosts" component={Hosts}/>
                        <Route path="/tags" component={TagsPage}/>
                        <Route path="/hosts:/id" component={HostPage}/>
                    </Switch>
                </App>


            </div>
        </BrowserRouter>
    )
}