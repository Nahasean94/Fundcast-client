import React from 'react'
import PropTypes from 'prop-types'
import jwt from "jsonwebtoken"
import {timeSince} from "../../shared/TimeSince"
import {Consumer} from 'graphql-react'
import {Link} from "react-router-dom"

class PodcastView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.props.podcast,

        }
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

        const more = <p>
            {description !== undefined &&
            description.substr(0, 599)}... <a href="">more</a></p>

        const imageView =
            <img src={`http://localhost:8080/uploads/${coverImage.path}`} width="150" height="120"
                 alt={title} className="rounded"/>
        return (
            <div>
                <div className="well">
                    <div className="row">
                        <div className="col-sm-3">
                            <Link to={link}>{imageView}</Link>

                        </div>
                        <div className="col-sm-9">
                            <Link to={link}><h3>{title}</h3></Link>
                            <strong>HOSTED BY:</strong> <a href="" onClick={this.onProfileLink}
                                                           id={hosts[0].id}>{hosts[0].username}</a>
                            <div className="feed-meta">
                                <ul className="list-inline list-unstyled">
                                    <li className="list-inline-item">{timeSince(timestamp)}</li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="view-podcast">
                        {description !== '' ? description.length > 600 ? more : description : coverImage}
                    </div>
                </div>
                <hr/>

            </div>
        )
    }

}


PodcastView.contextTypes = {
    router: PropTypes.object.isRequired
}

export default PodcastView
