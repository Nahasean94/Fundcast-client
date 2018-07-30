import React from 'react'
import PropTypes from 'prop-types'
import {timeSince} from "../../shared/TimeSince"
import jwt from 'jsonwebtoken'
import UnlockModal from "../../modals/UnlockModal"

class PodcastView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ...this.props.podcast,
            showFullDescription: false,
            hasPaid: false,
            showUnlockModal: false,
        }
        this.showFullDescription = this.showFullDescription.bind(this)
        this.showUnlockModal = this.showUnlockModal.bind(this)
        this.closeUnlockModal = this.closeUnlockModal.bind(this)
        this.viewPodcast = this.viewPodcast.bind(this)
        if (localStorage.getItem("Fundast")) {
            const token = jwt.decode(localStorage.getItem("Fundcast"))
            this.props.podcast.payment.buyers.map(buyer => {
                if (token.id === buyer) {
                    this.state.hasPaid = true
                }
            })
        }
    }

    showUnlockModal() {
        this.setState({showUnlockModal: true})
    }

    closeUnlockModal() {
        this.setState({showUnlockModal: false})
    }

    viewPodcast(e, link) {
        e.preventDefault()
        if (this.props.podcast.payment.paid == 0) {
            this.context.router.history.push(link)
        }
        else if (this.state.hasPaid) {
            this.context.router.history.push(link)
        } else {
            this.setState({showUnlockModal: true})
        }
    }

    showFullDescription(e) {
        e.preventDefault()
        this.setState({showFullDescription: true})
    }


    render() {
        const {id, title, description, tags, listens, hosts, timestamp, payment, coverImage, likes} = this.props.podcast
        const {showFullDescription, hasPaid} = this.state

        const link = `/podcasts/${id}`

        const more = <p>
            {description !== undefined &&
            description.substr(0, 599)}... <a href="" onClick={this.showFullDescription}>more</a></p>

        const imageView =
            <img src={`http://localhost:8080/uploads/${coverImage.path}`} width="150" height="120"
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
        return (
            <div className="well">
                <div className="row">
                    <div className="col-sm-3">
                        <a href="" onClick={(e) => {
                            this.viewPodcast(e, link)
                        }}>{imageView}</a>

                    </div>
                    <div className="col-sm-9">
                        <a href="" onClick={(e) => {
                            this.viewPodcast(e, link)
                        }}><h3>{title}</h3></a>
                        {hostedBy}
                        <div className="feed-meta">
                            <ul className="list-inline list-unstyled">
                                <li className="list-inline-item">Posted about {timeSince(timestamp)}</li>

                            </ul>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="view-podcast">
                    {description !== '' && description.length > 600 && !showFullDescription ? more : description}
                </div>
                <br/>
                <ul className="list-inline">
                    &nbsp;<i className="fa fa-tags"></i>
                    {tags.map((tag, i) => {

                        return <li key={i} className="list-inline-item">&nbsp;{tag}</li>
                    })}
                    {payment.paid == 1 && !hasPaid && < li className="list-inline-item">
                        <button className="btn btn-sm btn-primary" onClick={this.showUnlockModal}>Unlock
                            ${payment.amount}</button>
                    </li>}
                    <li className="list-inline-item pull-right">
                        <ul className="list-inline">
                            <li className="list-inline-item"><strong>{likes.length} likes</strong></li>
                            <li className="list-inline-item"><strong> {listens} people listened</strong></li>
                        </ul>
                    </li>
                </ul>
                <hr/>
                <UnlockModal show={this.state.showUnlockModal} onClose={this.closeUnlockModal}
                             podcast={this.props.podcast}/>
            </div>
        )
    }


}


PodcastView.contextTypes = {
    router: PropTypes.object.isRequired
}

export default PodcastView
