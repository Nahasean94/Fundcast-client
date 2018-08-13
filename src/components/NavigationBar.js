import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import NewPodcastForm from './podcasts/modals/NewPodcastForm'
import {Consumer, Query} from "graphql-react"
import jwt from "jsonwebtoken"
import classnames from 'classnames'
import validator from 'validator'
import {isEmpty} from 'lodash'
import SearchTerm from './search/SearchTerm'
import {fundcastFetchOptionsOverride} from "../shared/fetchOverrideOptions"
import {getNotifications} from "../shared/queries"
import {timeSince} from "../shared/TimeSince"

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showNewPodcastModal: false,
            search: '', errors: {},
        }
        this.logout = this.logout.bind(this)
        this.showNewPodcastModal = this.showNewPodcastModal.bind(this)
        this.closeNewPodcastModal = this.closeNewPodcastModal.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    validateInput(data) {
        let errors = {}

        if (validator.isEmpty(data.search)) {
            errors.search = 'Search cannot be empty'
        }

        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}})
            SearchTerm.setSearchTerm(this.state.search)
            this.context.router.history.push('/search')
        }
    }

    showNewPodcastModal(e) {
        e.preventDefault()
        this.setState({showNewPodcastModal: true})
    }

    closeNewPodcastModal() {
        this.setState({showNewPodcastModal: false})
    }

    componentDidMount() {
        const token = jwt.decode(localStorage.getItem("Fundcast"))
        if (token) {

        }
    }

    logout(e) {
        e.preventDefault()
        window.location.reload()
        localStorage.removeItem('Fundcast')
        this.context.router.history.push('/signin')
    }

    render() {
        const {showNewPodcastModal, errors, search} = this.state
        const searchError = errors.search
        let isAuthenticated = false
        let token
        if (localStorage.getItem('Fundcast')) {
            token = jwt.decode(localStorage.getItem('Fundcast'))
            isAuthenticated = true
        }
        const uploadButton = (
            <div className="navbar-nav flex-row ml-md-auto">
                <button className="btn btn-sm btn-default" onClick={this.showNewPodcastModal}>Add podcast</button>
            </div>)
        const fetchNotifications = <Query
            loadOnMount
            loadOnReset
            fetchOptionsOverride={fundcastFetchOptionsOverride}
            query={getNotifications}
        >
            {({loading, data}) => {
                if (data) {
                    if (data.getNotifications) {
                        return data.getNotifications.map(notification => {
                            const link = `/podcasts/${notification.podcast.id}`
                            const imageView =
                                <img src={`http://localhost:8080/uploads/${notification.podcast.coverImage.path}`}
                                     width="60"
                                     height="60"
                                     alt={notification.podcast.title} className="rounded"/>

                            const hostedBy =
                                <ul className="list-inline">
                                    <strong>HOSTED BY: </strong>
                                    {notification.podcast.hosts.map(host => {
                                        const hostsLink = `/hosts/${host.id}`
                                        return <li className="list-inline-item"><a href={hostsLink}
                                                                                   id={host.id}>{host.username}</a>{host === notification.podcast.hosts[notification.podcast.hosts.length - 1] ? '' : ','}
                                        </li>
                                    })}
                                </ul>
                            return <div className="well notification">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Link to={link}>{imageView}</Link>

                                    </div>
                                    <div className="col-sm-9">
                                        <Link to={link}><h6>{notification.podcast.title}</h6></Link>
                                        {hostedBy}
                                        <div className="feed-meta">
                                            <ul className="list-inline list-unstyled">
                                                <li className="list-inline-item">Posted
                                                    about {timeSince(notification.timestamp)}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/*<hr/>*/}
                            </div>
                        })
                    } else {
                        return <p>You have no unread notifications</p>
                    }
                }
                else if (loading) {
                    return <p>Loading…</p>
                }
                return <p>Loading failed.</p>
            }
            }
        </Query>
        const notifcationIcon = <div className="dropdown">
            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenu2"
                    data-toggle="dropdown" aria-expanded="false">
                <span><i className="fa fa-bell"></i></span>
            </button>
            <div className="dropdown-menu feed-meta dropdown-menu-right" aria-labelledby="dropdownMenu2">
                {fetchNotifications}
            </div>
        </div>
        const userLinks = (<div className="navbar-nav flex-row ml-md-auto">
            {notifcationIcon} &nbsp;
            {token && token.role === 'host' && uploadButton}
            <a href="/logout" className="nav-item nav-link" onClick={this.logout}>Logout </a>
            {token && <Link to="/profile" className="nav-item nav-link">{token.username}</Link>}

        </div>)

        const guestLinks = (
            <div className="navbar-nav flex-row ml-md-auto">
                <Link className="nav-item nav-link" to="/signin">Sign in</Link>
            </div>)

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <a className="navbar-brand" href="/">
                    <img src="/img/logo.png" width="150" height="30"
                         className="d-inline-block align-top" alt=""/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/hosts">Hosts</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/tags">Tags</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/faqs">Faqs</a>
                        </li>
                    </ul>
                    <div className="navbar-search">
                        <div className="search-block-form">
                            <div className="input-group-btn">
                                <form acceptCharset="UTF-8"
                                      onSubmit={this.onSubmit} className="form-inline">
                                    <div className="form-group">
                                        <input title="Search"
                                               type="search" name="search" onChange={this.onChange}
                                               value={search} size="70" maxLength="128"
                                               className={classnames("form-control form-control-sm", {"form-control is-invalid": searchError})}
                                               placeholder="Search"/>
                                        {searchError && <div className="invalid-feedback">{searchError}</div>}
                                    </div>

                                    {/*<div className="form-group">*/}
                                    {/*<input type="submit" value="Search"*/}
                                    {/*className="btn btn-default form-control-sm"/>*/}
                                    {/*</div>*/}

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {isAuthenticated ? userLinks : guestLinks}
                </div>
                <Consumer>{graphql => <NewPodcastForm graphql={graphql} show={showNewPodcastModal}
                                                      onClose={this.closeNewPodcastModal}/>}</Consumer>
            </nav>


        )
    }
}

NavigationBar.contextTypes = {
    router: PropTypes.object.isRequired
}
//
export default NavigationBar
