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
import UnpublishPodcastModal from "./modals/UnpublishModal"
import DeletePodcastModal from "./modals/ConfirmDeletePodcast"


class PodcastPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditPodcastModal: false,
            showPublishPodcastModal: false,
            showUnpublishPodcastModal: false,
            showDeletePodcastModal: false,

        }
        this.showEditPodcastModal=this.showEditPodcastModal.bind(this)
        this.closeEditPodcastModal=this.closeEditPodcastModal.bind(this)
        this.showPublishPodcastModal=this.showPublishPodcastModal.bind(this)
        this.closePublishPodcastModal=this.closePublishPodcastModal.bind(this)
        this.showUnpublishPodcastModal=this.showUnpublishPodcastModal.bind(this)
        this.closeUnpublishPodcastModal=this.closeUnpublishPodcastModal.bind(this)
        this.showDeletePodcastModal=this.showDeletePodcastModal.bind(this)
        this.closeDeletePodcastModal=this.closeDeletePodcastModal.bind(this)
    }

    showEditPodcastModal(e) {
        this.setState({showEditPodcastModal: true})
    }

    closeEditPodcastModal(e) {
        this.setState({showEditPodcastModal: false})
    }

    showPublishPodcastModal(e) {
        this.setState({showPublishPodcastModal: true})
    }

    closePublishPodcastModal(e) {
        this.setState({showPublishPodcastModal: false})
    }

    showUnpublishPodcastModal(e) {
        this.setState({showUnpublishPodcastModal: true})
    }

    closeUnpublishPodcastModal(e) {
        this.setState({showUnpublishPodcastModal: false})
    }

    showDeletePodcastModal(e) {
        this.setState({showDeletePodcastModal: true})
    }

    closeDeletePodcastModal(e) {
        this.setState({showDeletePodcastModal: false})
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
                        const {id, title, description, tags, listens, hosts, timestamp, payment, coverImage, likes, audioFile} = data.podcast
                        const {showEditPodcastModal, showDeletePodcastModal, showPublishPodcastModal, showUnpublishPodcastModal} = this.state
                        const imageView =
                            <img src={`http://localhost:8080/uploads/${coverImage.path}`} width="350" height="270"
                                 alt={title} className="rounded"/>
                        const audioView = <audio src={`http://localhost:8080/uploads/${audioFile.path}`} controls={true}
                                                 className="rounded" style={{width: '100%'}}/>
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
                        return <div className="row">
                            <div className="col-sm-3">
                                {imageView}
                                <br/>
                                <br/>
                                <hr/>
                                <div className="feed-meta">
                                    <ul className="list-inline list-unstyled">
                                        <li className="list-inline-item pull-left"><Consumer>{graphql => <LikingPodcast
                                            graphql={graphql} likes={likes}/>}</Consumer></li>
                                        <li className="list-inline-item pull-right"><h6> {listens} people listened</h6>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-5 offset-sm-1">
                                <ul className="list-inline list-unstyled">

                                    <li className="list-inline-item pull-right">
                                        <div className="dropdown">
                                            <button className="btn btn-dark btn-sm dropdown-toggle" type="button"
                                                    id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                Actions
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                <button className="dropdown-item btn-sm" type="button" onClick={this.showEditPodcastModal}>Edit</button>
                                                <button className="dropdown-item btn-sm" type="button" onClick={this.showUnpublishPodcastModal}>Unpublish
                                                </button>
                                                <button className="dropdown-item btn-sm" type="button" onClick={this.showDeletePodcastModal}>Delete
                                                </button>
                                            </div>
                                        </div>

                                    </li>
                                    <li className="list-inline-item pull-left"><h3>{title}</h3></li>
                                </ul>
                                <br/>
                                <br/>
                                {hostedBy}
                                <div className="feed-meta">
                                    <ul className="list-inline list-unstyled">
                                        <li className="list-inline-item">Posted about {timeSince(timestamp)}</li>
                                    </ul>
                                </div>
                                <br/>
                                {audioView}
                                <br/>
                                <br/>
                                <div className="view-podcast"> {description}
                                </div>
                                <div>
                                    <br/>
                                    <br/>
                                    <ul className="list-inline">
                                        &nbsp;<i className="fa fa-tags"></i>
                                        {tags.map((tag, i) => {
                                            return <li key={i} className="list-inline-item"><a href="">&nbsp;{tag}</a>
                                            </li>
                                        })}
                                    </ul>
                                </div>
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
                                                if (data.podcasts.length>0) {
                                                    return data.podcasts.map(podcast =>
                                                        (
                                                            <div key={shortid.generate()}>
                                                                <Consumer>{graphql => <RelatedPodcasts podcast={podcast}
                                                                                                       graphql={graphql}/>}</Consumer>
                                                            </div>
                                                        )
                                                    )
                                                }else{
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
                            <Consumer>{graphql =>  <EditPodcastModal graphql={graphql} show={showEditPodcastModal} onClose={this.closeEditPodcastModal}  coverImage={coverImage} description={description} id={id} hosts={hosts} paid={payment.paid} podcast={podcast} tags={tags} title={title}/>}</Consumer>
                            <Consumer>{graphql =>   <UnpublishPodcastModal graphql={graphql} id={id} show={showUnpublishPodcastModal} onClose={this.closeUnpublishPodcastModal}/>}</Consumer>
                            <Consumer>{graphql =>   <DeletePodcastModal graphql={graphql} id={id} show={showDeletePodcastModal} onClose={this.closeDeletePodcastModal}/>}</Consumer>
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
            </Query>)

    }
}

export default PodcastPage
