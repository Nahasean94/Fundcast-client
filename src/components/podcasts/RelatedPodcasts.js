import React from 'react'
import PropTypes from 'prop-types'
import jwt from "jsonwebtoken"
import {timeSince} from "../../shared/TimeSince"
import {Link} from "react-router-dom"

class RelatedPodcasts extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.props.podcast,

        }
        this.onProfileLink = this.onProfileLink.bind(this)
    }


    onProfileLink(e) {

        e.preventDefault()
        const {hosts, profile} = this.props.podcast
// this.props.clearPodcasts()
        const token = jwt.decode(localStorage.getItem('Fundcast')) ? jwt.decode(localStorage.getItem('Fundcast')) : ''
        if (token) {
            if (token.id !== hosts.id && token.id !== profile.id) {
                this.context.router.history.push(`/fundcast/${ e.target.id}`)
            }
            else if (token.id === hosts.id && token.id === profile.id) {
                if (window.location.pathname !== '/profile') {
                    this.context.router.history.push('/profile')
                }
            }
            else if (token.id === hosts.id && token.id !== profile.id) {
                if (window.location.pathname !== '/profile' && token.id === e.target.id) {

                    this.context.router.history.push('/profile')
                } else {
                    if (token.id !== e.target.id) {
                        this.context.router.history.push(`/fundcast/${profile.id}`)
                    }
                }
            }
            else if (token.id !== hosts.id && token.id === profile.id) {
                if (window.location.pathname === '/profile' && token.id !== e.target.id) {

                    this.context.router.history.push(`/fundcast/${hosts.id}`)
                }
                else if (window.location.pathname !== '/profile' && token.id === e.target.id) {

                    this.context.router.history.push('/profile')
                }
            }
        } else {
            this.context.router.history.push(`/fundcast/${ e.target.id}`)
        }

    }


    render() {
        const {id, title, description, tags, listens, hosts, timestamp, payment, coverImage, likes} = this.props.podcast

        const link = `/podcasts/${id}`
        const currentPodcast = window.location.pathname.split('/')[2]


        const imageView =
            <img src={`http://localhost:8080/uploads/${coverImage.path}`} width="200" height="150"
                 alt={title} className="rounded"/>
        if (id !== currentPodcast) {
            return (
                <div>
                    <Link to={link}>{imageView}</Link>

                    <Link to={link}><h6>{title}</h6></Link>
                    <strong>HOSTED BY:</strong> <a href="" onClick={this.onProfileLink}
                                                   id={hosts[0].id}>{hosts[0].username}</a>
                    <div className="feed-meta">
                        <ul className="list-inline list-unstyled">
                            <li className="list-inline-item">{timeSince(timestamp)}</li>

                        </ul>
                    </div>
                    <hr/>

                </div>
            )
        }
        return null
    }

}


RelatedPodcasts.contextTypes = {
    router: PropTypes.object.isRequired
}

export default RelatedPodcasts
