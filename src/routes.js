import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Profile from "./components/profile/Profile"
import SigninPage from "./components/SigninPage"
import App from "./components/App"
import requireAuth from "./utils/requireAuth"
import PodcastPage from './components/podcasts/PodcastPage'
import Home from "./components/Home"
import TestPage from "./components/TestPage"
import Hosts from "./components/hosts/Hosts"
import Tags from "./components/podcasts/tags/Tags"
import TagPage from "./components/podcasts/tags/TagPage"
import HostPage from "./components/hosts/HostPage"
import SearchResults from "./components/search/SearchResults"
import UserPage from "./users/UserPage"
import AdminDashboard from "./components/admin/AdminDashboard"
import AdminSignInPage from "./components/admin/signin/AdminSignInPage"
import requireAdminAuth from "./utils/requireAdminAuth"
import AboutPage from "./components/admin/pages/AboutPage"
import ListenersPage from "./components/admin/pages/ListenersPage"
import FaqsPage from "./components/admin/pages/FaqsPage"

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
                        <Route path="/users/:id" component={UserPage}/>
                        <Route path="/hosts" component={Hosts}/>
                        <Route path="/tags/:id" component={TagPage}/>
                        <Route path="/tags" component={Tags}/>
                        <Route path="/about" component={AboutPage}/>
                        <Route path="/faqs" component={FaqsPage}/>
                        {/*<Route path="/test" component={TestPage}/>*/}
                        <Route path="/test" component={TestPage}/>
                        <Route path="/search" component={SearchResults}/>
                        <Route path="/admin/signin" component={AdminSignInPage}/>
                        <Route path="/admin/about" component={requireAdminAuth(AboutPage)}/>
                        <Route path="/admin/listeners" component={requireAdminAuth(ListenersPage)}/>
                        <Route path="/admin/faqs" component={requireAdminAuth(FaqsPage)}/>
                        <Route path="/admin" component={requireAdminAuth(AdminDashboard)}/>
                    </Switch>
                </App>


            </div>
        </BrowserRouter>
    )
}