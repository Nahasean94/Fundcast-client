import React, {Component} from 'react'
import {fetchHostPodcasts, fetchUserProfile} from "../../shared/queries"
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {Consumer, Query} from 'graphql-react'
import shortid from "shortid"
import PodcastView from "../podcasts/PodcastView"
import * as jwt from "jsonwebtoken"
import PropTypes from 'prop-types'
import HostsSubscriptions from "../subscriptions/HostsSubscriptions"
import Donate from "./Donate"

class HostPage extends Component {
    constructor(props){
        super(props)
        this.state={
            showDonateModal:false
        }
        this.showDonateModal=this.showDonateModal.bind(this)
        this.closeDonateModal=this.closeDonateModal.bind(this)
    }
    showDonateModal(){
        this.setState({showDonateModal:true})
    }
    closeDonateModal(){
        this.setState({showDonateModal:false})
    }
    render() {
        const token = jwt.decode(localStorage.getItem("Fundcast"))
        if (token) {
            if (token.id === window.location.pathname.split('/')[2]) {
                this.props.history.push('/profile')
            }
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3">
                        <Query
                            loadOnMount
                            loadOnReset
                            fetchOptionsOverride={fundcastFetchOptionsOverride}
                            variables={{id: window.location.pathname.split('/')[2]}}
                            query={fetchUserProfile}
                        >
                            {({loading, data}) => {
                                if (data) {
                                    const {id, username, profile_picture, email, role, date_joined, ethereum_address, subscribers} = data.fetchUserProfile

                                    return <div>
                                        <ul className="list-unstyled">
                                            <li><img src={`http://localhost:8080/uploads/${profile_picture}`}
                                                     alt="Profile picture"
                                                     width="300"
                                                     height="200"/>
                                            </li>
                                            <li>
                                               <strong>Username: </strong>  {username}
                                            </li>
                                            <li>
                                               <strong>Email: </strong>  {email}
                                            </li>
                                            <li>
                                               <strong>Account: </strong>  {role}
                                            </li>
                                            <li>
                                               <strong>Date joined: </strong>  {new Date(date_joined).toLocaleDateString()}
                                            </li>
                                            <li>
                                                <strong>Ethereum address: </strong> {ethereum_address}
                                            </li>

                                            {ethereum_address&&<li>
                                               <button className="btn btn-sm btn-primary" onClick={this.showDonateModal}>Donate</button>
                                            </li>}
                                            <Donate show={this.state.showDonateModal} onClose={this.closeDonateModal} ethereum_address={ethereum_address}/>

                                        </ul>
                                        <hr/>
                                        <Consumer>{graphql => <HostsSubscriptions graphql={graphql}
                                                                                  subscribers={subscribers}/>}</Consumer>
                                    </div>

                                } else if (loading) {
                                    return (
                                        <p>Loading…</p>
                                    )
                                }
                                return (
                                    <p>Loading failed.</p>
                                )
                            }
                            }
                        </Query>
                    </div>
                    <div className="col-sm-8">
                        <Query
                            loadOnMount
                            loadOnReset
                            fetchOptionsOverride={fundcastFetchOptionsOverride}
                            variables={{id: window.location.pathname.split('/')[2]}}
                            query={fetchHostPodcasts}
                        >
                            {({loading, data}) => {
                                if (data) {
                                    if (data.fetchHostPodcasts) {
                                        return data.fetchHostPodcasts.map(podcast => {
                                            let isHost = false
                                            let token
                                            if (localStorage.getItem('Fundcast')) {
                                                token = jwt.decode(localStorage.getItem('Fundcast'))
                                                podcast.hosts.map(host => {
                                                    if (host.username === token.username)
                                                        isHost = true
                                                })
                                            }
                                            if (podcast.publishing === 'published' || isHost) {
                                                return (
                                                    <div key={shortid.generate()}>
                                                        <Consumer>{graphql => <PodcastView podcast={podcast}
                                                                                           graphql={graphql}/>}</Consumer>
                                                    </div>
                                                )
                                            }
                                        })
                                    } else {
                                        return (
                                            <p>No podcasts found</p>
                                        )
                                    }
                                } else if (loading) {
                                    return (
                                        <p>Loading…</p>
                                    )
                                }
                                return (
                                    <p>Loading failed.</p>
                                )
                            }
                            }
                        </Query>

                    </div>
                </div>
            </div>
        )
    }
}

HostPage.contextTypes = {
    router: PropTypes.object.isRequired
}
export default HostPage
