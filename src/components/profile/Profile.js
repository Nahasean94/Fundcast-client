import React, {Component} from 'react'
import {fetchHostPodcasts, fetchUserProfile, fetchLikedPodcasts, getHistory} from "../../shared/queries"
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {Consumer, Query} from 'graphql-react'
import shortid from "shortid"
import PodcastView from "../podcasts/PodcastView"
import * as jwt from "jsonwebtoken"
import UpdateProfile from "./UpdateProfile"

class HostPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateProfileModal: false
        }
        this.showUpdateProfileModal = this.showUpdateProfileModal.bind(this)
        this.closeUpdateProfileModal = this.closeUpdateProfileModal.bind(this)

    }

    showUpdateProfileModal(e) {
        this.setState({showUpdateProfileModal: true})
    }

    closeUpdateProfileModal(e) {
        this.setState({showUpdateProfileModal: false})
    }



    render() {
        const token = jwt.decode(localStorage.getItem("Fundcast"))
        let id
        if (token) {
            id = token.id
        }
        const {showUpdateProfileModal} = this.state

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3">
                        <Query
                            loadOnMount
                            loadOnReset
                            fetchOptionsOverride={fundcastFetchOptionsOverride}
                            variables={{id}}
                            query={fetchUserProfile}
                        >
                            {({loading, data}) => {
                                if (data) {
                                    const {id, username, profile_picture, email, role, date_joined, ethereum_address,} = data.fetchUserProfile
                                    return <div>
                                        <ul className="list-unstyled">
                                            <li><img src={`http://localhost:8080/uploads/${profile_picture}`}
                                                     alt="Profile picture"
                                                     width="300"
                                                     height="200"/>
                                            </li>
                                            <li>
                                                Username: {username}
                                            </li>
                                            <li>
                                                Email: {email}
                                            </li>
                                            <li>
                                                Account: {role}
                                            </li>
                                            <li>
                                                Date joined: {date_joined}
                                            </li>
                                            <li>
                                                Ethereum address: {ethereum_address}
                                            </li>

                                        </ul>
                                        <hr/>
                                        <button className="btn btn-sm btn-outline-primary"
                                                onClick={this.showUpdateProfileModal}>Update profile
                                        </button>
                                        <Consumer>{graphql => <UpdateProfile graphql={graphql}
                                                                             show={showUpdateProfileModal}
                                                                             onClose={this.closeUpdateProfileModal}
                                                                             username={username} email={email}
                                                                             role={role}
                                                                             profilePicture={profile_picture} id={id}
                                                                             ethereum_address={ethereum_address}/>}</Consumer>
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
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab"
                                   href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Your
                                    podcasts</a>
                                <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab"
                                   href="#nav-history" role="tab" aria-controls="nav-history"
                                   aria-selected="false">History</a>
                                <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab"
                                   href="#nav-liked" role="tab" aria-controls="nav-liked"
                                   aria-selected="false">Liked podcasts</a>
                                <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab"
                                   href="#nav-subscriptions" role="tab" aria-controls="nav-subscriptions"
                                   aria-selected="false">Subscriptions</a>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel"
                                 aria-labelledby="nav-home-tab">
                                <Query
                                    loadOnMount
                                    loadOnReset
                                    fetchOptionsOverride={fundcastFetchOptionsOverride}
                                    variables={{id}}
                                    query={fetchHostPodcasts}
                                >
                                    {({loading, data}) => {
                                        if (data) {
                                            if (data.fetchHostPodcasts) {
                                                if (data.fetchHostPodcasts.length > 0) {
                                                    return data.fetchHostPodcasts.map(podcast => {
                                                        return (
                                                            <div key={shortid.generate()}>
                                                                <Consumer>{graphql => <PodcastView podcast={podcast}
                                                                                                   graphql={graphql}/>}</Consumer>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            } else {
                                                return (
                                                    <p>No podcasts found found</p>
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
                            <div className="tab-pane fade" id="nav-history" role="tabpanel"
                                 aria-labelledby="nav-history-tab"><Query
                                loadOnMount
                                loadOnReset
                                fetchOptionsOverride={fundcastFetchOptionsOverride}
                                variables={{id}}
                                query={getHistory}
                            >
                                {({loading, data}) => {
                                    if (data) {
                                        if (data.getHistory) {
                                            if (data.getHistory.length > 0) {
                                                return data.getHistory.map(podcast => {
                                                    return (
                                                        <div key={shortid.generate()}>
                                                            <Consumer>{graphql => <PodcastView podcast={podcast}
                                                                                               graphql={graphql}/>}</Consumer>
                                                        </div>
                                                    )
                                                })
                                            }
                                        } else {
                                            return (
                                                <p>No podcasts found found</p>
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
                            <div className="tab-pane fade" id="nav-liked" role="tabpanel"
                                 aria-labelledby="nav-liked-tab">
                                <Query
                                    loadOnMount
                                    loadOnReset
                                    fetchOptionsOverride={fundcastFetchOptionsOverride}
                                    variables={{id}}
                                    query={fetchLikedPodcasts}
                                >
                                    {({loading, data}) => {
                                        if (data) {
                                            if (data.fetchLikedPodcasts) {
                                                if (data.fetchLikedPodcasts.length > 0) {
                                                    return data.fetchLikedPodcasts.map(podcast => {
                                                        return (
                                                            <div key={shortid.generate()}>
                                                                <Consumer>{graphql => <PodcastView podcast={podcast}
                                                                                                   graphql={graphql}/>}</Consumer>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            } else {
                                                return (
                                                    <p>No podcasts found found</p>
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
                            <div className="tab-pane fade" id="nav-subscriptions" role="tabpanel"
                                 aria-labelledby="nav-subscriptions-tab"><h4>List of podcasts/hosts you've subscribed to
                                will go here</h4>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default HostPage
