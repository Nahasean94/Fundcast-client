import React, {Component} from 'react'
import {podcast, podcasts} from "../../shared/queries"
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {Consumer, Query} from 'graphql-react'
import {timeSince} from "../../shared/TimeSince"
import RelatedPodcasts from "./RelatedPodcasts"
import shortid from "shortid"
import Comments from "../comments/Comments"
import LikingPodcast from "./LikingPodcast"
import EditPodcastModal from "./modals/EditPodcastModal"
import UnpublishPodcastModal from "./modals/UnpublishPodcastModal"
import DeletePodcastModal from "./modals/ConfirmDeletePodcast"
import PublishPodcastModal from "./modals/PublishPodcastModal"
import jwt from "jsonwebtoken"
import ListeningPodcast from "./ListeningPodcast"
import Buyers from "./modals/buyers/Buyers"


class PodcastPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditPodcastModal: false,
            showPublishPodcastModal: false,
            showUnpublishPodcastModal: false,
            showDeletePodcastModal: false,
            showBuyersModal:false

        }
        this.showEditPodcastModal = this.showEditPodcastModal.bind(this)
        this.closeEditPodcastModal = this.closeEditPodcastModal.bind(this)
        this.showPublishPodcastModal = this.showPublishPodcastModal.bind(this)
        this.closePublishPodcastModal = this.closePublishPodcastModal.bind(this)
        this.showUnpublishPodcastModal = this.showUnpublishPodcastModal.bind(this)
        this.closeUnpublishPodcastModal = this.closeUnpublishPodcastModal.bind(this)
        this.showDeletePodcastModal = this.showDeletePodcastModal.bind(this)
        this.closeDeletePodcastModal = this.closeDeletePodcastModal.bind(this)
        this.showBuyersModal = this.showBuyersModal.bind(this)
        this.closeBuyersModal = this.closeBuyersModal.bind(this)

    }

    showEditPodcastModal() {
        this.setState({showEditPodcastModal: true})
    }

    closeEditPodcastModal() {
        this.setState({showEditPodcastModal: false})
    }

    showPublishPodcastModal() {
        this.setState({showPublishPodcastModal: true})
    }

    closePublishPodcastModal() {
        this.setState({showPublishPodcastModal: false})
    }

    showUnpublishPodcastModal() {
        this.setState({showUnpublishPodcastModal: true})
    }

    closeUnpublishPodcastModal() {
        this.setState({showUnpublishPodcastModal: false})
    }

    showDeletePodcastModal() {
        this.setState({showDeletePodcastModal: true})
    }

    closeDeletePodcastModal() {
        this.setState({showDeletePodcastModal: false})
    }
    showBuyersModal() {
        this.setState({showBuyersModal: true})
    }

    closeBuyersModal() {
        this.setState({showBuyersModal: false})
    }


    render() {

        return (
            <Query
                loadOnMount
                loadOnReset
                fetchOptionsOverride={fundcastFetchOptionsOverride}
                variables={{id: window.location.pathname.split('/')[2]}}
                query={podcast}
            >
                {({loading, data}) => {
                    if (data) {
                        const {id, title, description, tags, listens, hosts, timestamp, payment, coverImage, likes, audioFile, publishing} = data.podcast
                        console.log(payment)
                        const {showEditPodcastModal, showDeletePodcastModal, showPublishPodcastModal, showUnpublishPodcastModal} = this.state
                        let isHost = false
                        let token
                        if (localStorage.getItem('Fundcast')) {
                            token = jwt.decode(localStorage.getItem('Fundcast'))
                            hosts.map(host => {
                                if (host.username === token.username)
                                    isHost = true
                            })
                        }
                        const imageView =
                            <img src={`http://localhost:8080/uploads/${coverImage.path}`} width="350" height="270"
                                 alt={title} className="rounded"/>

                        const hostedBy =
                            <ul className="list-inline">
                                <strong>HOSTED BY: </strong>
                                {hosts.map(host => {
                                    const hostsLink = `/hosts/${host.id}`
                                    return <li className="list-inline-item"><a href={hostsLink}
                                                                               id={host.id}>{host.username}</a>{host === hosts[hosts.length - 1] ? '' : ','}
                                    </li>
                                })}
                            </ul>
                        const publishButton = <button className="btn btn-outline-primary btn-sm" type="button"
                                                      onClick={this.showPublishPodcastModal}>Publish
                        </button>
                        const unPublishButton = <button className="btn btn-outline-dark btn-sm" type="button"
                                                        onClick={this.showUnpublishPodcastModal}>Unpublish
                        </button>
                        const hostActions = <div>
                            <ul className="list-inline list-unstyled">
                                <li className="list-inline-item">
                                    {publishing === 'published' ? unPublishButton : publishButton}
                                </li>
                                <li className="list-inline-item">
                                    <button className="btn btn-outline-success btn-sm"
                                            onClick={this.showEditPodcastModal}>Edit
                                    </button>
                                </li>
                                <li className="list-inline-item">
                                    <button className="btn btn-outline-danger btn-sm" type="button"
                                            onClick={this.showDeletePodcastModal}>Delete
                                    </button>
                                </li>
                            </ul>
                            <br/>
                            {payment.paid && <button className="btn btn-primary btn-sm" type="button"
                                    onClick={this.showBuyersModal}>View buyers {payment.buyers.length}
                            </button>}
                            <hr/>
                            <Buyers buyers={payment.buyers} show={this.state.showBuyersModal} onClose={this.closeBuyersModal}/>
                        </div>
                        if (publishing === 'published' || isHost) {
                            return <div className="row">
                                <div className="col-sm-3">
                                    {imageView}
                                    <hr/>
                                    {isHost ? hostActions : ''}
                                    <div className="feed-meta">
                                        <ul className="list-inline list-unstyled">
                                            <li className="list-inline-item pull-left"><Consumer>{graphql =>
                                                <LikingPodcast
                                                    graphql={graphql} likes={likes}/>}</Consumer></li>
                                            <li className="list-inline-item pull-right"><h6> {listens} people
                                                listened</h6>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-5 offset-sm-1">
                                    <h2>{title}</h2>
                                    <br/>
                                    {hostedBy}
                                    <div className="feed-meta">
                                        <ul className="list-inline list-unstyled">
                                            <li className="list-inline-item">Posted about {timeSince(timestamp)}</li>
                                        </ul>
                                    </div>
                                    <br/>
                                    <Consumer>{graphql => <ListeningPodcast graphql={graphql}
                                                                            podcast={data.podcast}/>}</Consumer>

                                    <br/>
                                    <br/>
                                    <div className="view-podcast"> {description}
                                    </div>

                                    <br/>
                                    <br/>
                                    <ul className="list-inline">
                                        &nbsp;<i className="fa fa-tags"></i>
                                        {tags.map((tag, i) => {
                                            return <li key={i} className="list-inline-item"><a
                                                href="">&nbsp;{tag}</a>
                                            </li>
                                        })}
                                    </ul>
                                    <hr/>
                                    <Consumer>{graphql => <Comments graphql={graphql}/>}</Consumer>
                                </div>
                                <div className="col-sm-2 offset-sm-1">
                                    <h6>Related podcasts</h6>
                                    {
                                        <Query
                                            loadOnMount
                                            loadOnReset
                                            fetchOptionsOverride={fundcastFetchOptionsOverride}
                                            query={podcasts}
                                        >
                                            {({loading, data}) => {
                                                if (data) {
                                                    if (data.podcasts.length > 0) {
                                                        return data.podcasts.map(podcast =>
                                                            (
                                                                <div key={shortid.generate()}>
                                                                    <Consumer>{graphql => <RelatedPodcasts
                                                                        podcast={podcast}
                                                                        graphql={graphql}/>}</Consumer>
                                                                </div>
                                                            )
                                                        )
                                                    } else {
                                                        return <p>No related podcasts found</p>
                                                    }
                                                }
                                                else if (loading) {
                                                    return <p>Loading…</p>
                                                }
                                                return <p>Loading failed.</p>
                                            }

                                            }
                                        </Query>
                                    }

                                </div>
                                <Consumer>{graphql => <EditPodcastModal graphql={graphql} show={showEditPodcastModal}
                                                                        onClose={this.closeEditPodcastModal}
                                                                        podcast={data.podcast}
                                                                        />}</Consumer>
                                <Consumer>{graphql => <UnpublishPodcastModal graphql={graphql} id={id}
                                                                             show={showUnpublishPodcastModal}
                                                                             onClose={this.closeUnpublishPodcastModal}/>}</Consumer>
                                <Consumer>{graphql => <PublishPodcastModal graphql={graphql} id={id}
                                                                           show={showPublishPodcastModal}
                                                                           onClose={this.closePublishPodcastModal}/>}</Consumer>

                                <Consumer>{graphql => <DeletePodcastModal graphql={graphql} id={id}
                                                                          show={showDeletePodcastModal}
                                                                          onClose={this.closeDeletePodcastModal}/>}</Consumer>
                            </div>
                        }
                        else {
                            return (
                                <h1>This podcast has not been published</h1>
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
            </Query>)

    }
}

export default PodcastPage
