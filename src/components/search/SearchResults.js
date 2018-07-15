import React from 'react'
import {Consumer} from 'graphql-react'
import Podcasts from "./Podcasts"
import Hosts from "./Hosts"
import Users from "./Users"
import Tags from "./Tags"

class SearchResults extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 offset-sm-2">
                    <ul className="nav nav-pills nav-justified" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="pills-podcasts-tab" data-toggle="pill" href="#pills-podcasts"
                               role="tab" aria-controls="pills-podcasts" aria-selected="true">Podcasts</a>
                    </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-tags-tab" data-toggle="pill" href="#pills-tags"
                               role="tab" aria-controls="pills-tags" aria-selected="true">Tags</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-hosts-tab" data-toggle="pill" href="#pills-hosts"
                               role="tab" aria-controls="pills-hosts" aria-selected="false">Hosts</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-users-tab" data-toggle="pill" href="#pills-users"
                               role="tab" aria-controls="pills-users" aria-selected="false">Users</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-podcasts" role="tabpanel"
                             aria-labelledby="pills-podcasts-tab">
                            <Consumer>{graphql=><Podcasts graphql={graphql}/>}</Consumer>
                        </div>
                        <div className="tab-pane fade" id="pills-tags" role="tabpanel"
                             aria-labelledby="pills-tags-tab">
                            <Consumer>{graphql=><Tags graphql={graphql}/>}</Consumer>
                        </div>
                        <div className="tab-pane fade" id="pills-hosts" role="tabpanel"
                             aria-labelledby="pills-hosts-tab">
                            <Consumer>{graphql=><Hosts graphql={graphql}/>}</Consumer>

                        </div>
                        <div className="tab-pane fade" id="pills-users" role="tabpanel"
                             aria-labelledby="pills-users-tab">
                            <Consumer>{graphql=><Users graphql={graphql}/>}</Consumer>

                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResults