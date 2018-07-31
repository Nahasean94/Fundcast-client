import React, {Component} from 'react'
import {
    fetchHostPodcasts,
    fetchLikedPodcasts,
    fetchUserProfile,
    getHistory,
    getHostsSubscriptions,
    getTagsSubscriptions
} from "../../shared/queries"
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {Consumer, Query} from 'graphql-react'
import shortid from "shortid"
import PodcastView from "../podcasts/PodcastView"
import * as jwt from "jsonwebtoken"
import UpdateProfile from "./UpdateProfile"
import {Link} from "react-router-dom"
import Fundcast from "../../blockchain/build/contracts/Fundcast"
import getWeb3 from "../../utils/getWeb3"

const contract = require('truffle-contract')

class HostPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showUpdateProfileModal: false,
            balance: ''
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


    componentWillMount() {
        const token = jwt.decode(localStorage.getItem("Fundcast"))
        if (token.ethereum_address) {

            // Get network provider and web3 instance.
            getWeb3
                .then(results => {
                    this.setState({
                        web3: results.web3
                    })
                }).then(() => {
                const fundcast = contract(Fundcast)
                fundcast.setProvider(this.state.web3.currentProvider)
                // Declaring this for later so we can chain functions on SimpleStorage.
                let fundcastInstance

                // Get accounts.
                this.state.web3.eth.getCoinbase((error, coinbase) => {

                    fundcast.deployed().then(async (instance) => {
                        fundcastInstance = instance
                        return this.state.web3.eth.getBalance(token.ethereum_address).then(balance => {
                            this.setState({balance: (balance / 1000000000000000000) * 459.94})
                        })

                    })
                        .catch(() => {
                            console.log('Error finding web3.')
                        })
                })
            })
        }
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
                                                <strong>Username: </strong> {username}
                                            </li>
                                            <li>
                                                <strong>Email: </strong> {email}
                                            </li>
                                            <li>
                                                <strong>Account: </strong> {role}
                                            </li>
                                            <li>
                                                <strong>Date
                                                    joined: </strong> {new Date(date_joined).toLocaleDateString()}
                                            </li>
                                            <li>
                                                <strong>Ethereum address: </strong> {ethereum_address}
                                            </li>

                                            {ethereum_address && <li>
                                                <strong>Balance: </strong> {this.state.balance} USD
                                            </li>}

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
                                                                             profilePicture={profile_picture}
                                                                             id={id}
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
                                                                <Consumer>{graphql => <PodcastView
                                                                    podcast={podcast}
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
                                            } else {
                                                return (
                                                    <p>No podcasts found found</p>
                                                )
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
                                                                <Consumer>{graphql => <PodcastView
                                                                    podcast={podcast}
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
                                 aria-labelledby="nav-subscriptions-tab">
                                <br/>
                                <div className="row">
                                    <div className="col-2">
                                        <div className="nav flex-column nav-pills" id="v-pills-tab"
                                             role="tablist"
                                             aria-orientation="vertical">
                                            <a className="nav-link active" id="v-pills-home-tab"
                                               data-toggle="pill"
                                               href="#v-pills-home" role="tab" aria-controls="v-pills-home"
                                               aria-selected="true">Hosts</a>
                                            <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill"
                                               href="#v-pills-profile" role="tab"
                                               aria-controls="v-pills-profile"
                                               aria-selected="false">Tags</a>

                                        </div>
                                    </div>

                                    <div className="col-10">

                                        <div className="tab-content" id="v-pills-tabContent">
                                            <div className="tab-pane fade show active" id="v-pills-home"
                                                 role="tabpanel"
                                                 aria-labelledby="v-pills-home-tab">
                                                <Query
                                                    loadOnMount
                                                    loadOnReset
                                                    fetchOptionsOverride={fundcastFetchOptionsOverride}
                                                    variables={{id: jwt.decode(localStorage.getItem("Fundcast")).id}}
                                                    query={getHostsSubscriptions}
                                                >
                                                    {({loading, data}) => {
                                                        if (data) {
                                                            if (data.getHostsSubscriptions) {
                                                                return <div className="container">
                                                                    <div className="row">
                                                                        {data.getHostsSubscriptions.map(host => {
                                                                            const hostPage = `/hosts/${host.id}`
                                                                            return (
                                                                                <div key={shortid.generate()}>
                                                                                    <div className="col-sm-2">
                                                                                        <div className="">
                                                                                            <a href={hostPage}>
                                                                                                <img
                                                                                                    src={`http://localhost:8080/uploads/${host.profile_picture}`}
                                                                                                    width="150"
                                                                                                    height="100"
                                                                                                    alt={host.username}
                                                                                                    className="rounded"/></a>
                                                                                            <a href={hostPage}>
                                                                                                <h6>{host.username}</h6>
                                                                                            </a>
                                                                                        </div>

                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                        } </div>
                                                                </div>
                                                            }
                                                        }
                                                        else if (loading) {
                                                            return <p>Loading…</p>
                                                        }
                                                        return <p>Loading failed.</p>
                                                    }

                                                    }
                                                </Query>
                                            </div>
                                            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel"
                                                 aria-labelledby="v-pills-profile-tab">
                                                <Query
                                                    loadOnMount
                                                    loadOnReset
                                                    fetchOptionsOverride={fundcastFetchOptionsOverride}
                                                    variables={{id: jwt.decode(localStorage.getItem("Fundcast")).id}}
                                                    query={getTagsSubscriptions}
                                                >
                                                    {({loading, data}) => {
                                                        if (data) {
                                                            if (data.getTagsSubscriptions) {
                                                                return <div className="container">
                                                                    <div className="row">
                                                                        <ol>
                                                                            {data.getTagsSubscriptions.map(tag => {
                                                                                const tagsPage = `/tags/${tag.id}`
                                                                                return (
                                                                                    <li key={shortid.generate()}>
                                                                                        <Link
                                                                                            to={tagsPage}>{tag.name}</Link>
                                                                                    </li>
                                                                                )
                                                                            })}
                                                                        </ol>
                                                                    </div>
                                                                </div>
                                                            }
                                                        }
                                                        else if (loading) {
                                                            return <p>Loading…</p>
                                                        }
                                                        return <p>Loading failed.</p>
                                                    }

                                                    }
                                                </Query>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default HostPage
