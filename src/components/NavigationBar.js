import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import NewPodcastForm from './podcasts/NewPodcastForm'
import {Consumer} from "graphql-react"
import jwt from "jsonwebtoken"

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showNewPodcastModal: false,
        }

        this.logout = this.logout.bind(this)
        this.showNewPodcastModal = this.showNewPodcastModal.bind(this)
        this.closeNewPodcastModal = this.closeNewPodcastModal.bind(this)

    }

    showNewPodcastModal(e) {
        e.preventDefault()
        this.setState({showNewPodcastModal: true})
    }

    closeNewPodcastModal() {
        this.setState({showNewPodcastModal: false})
    }

    logout(e) {
        e.preventDefault()
        window.location.reload()
        localStorage.removeItem('Fundcast')
        this.context.router.history.push('/signin')
    }

    render() {
        const {showNewPodcastModal}=this.state
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
        const userLinks = (<div className="navbar-nav flex-row ml-md-auto">
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
                            <a className="nav-link" href="#">Hosts</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#">Genres</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Stations</a>
                        </li>
                    </ul>
                    <div className="navbar-search">
                        <div className="search-block-form">
                            <div className="input-group-btn">
                                <form id="search-block-form" acceptCharset="UTF-8"
                                      className="input-group">
                                    <input title="Enter the terms you wish to search for."
                                           data-drupal-selector="edit-keys" type="search" id="edit-keys" name="keys"
                                           value="" size="70" maxLength="128"
                                           className="form-search form-control input-group" placeholder="Search"/>


                                    <div data-drupal-selector="edit-actions"
                                         className="form-actions js-form-wrapper form-wrapper" id="edit-actions">
                                        <input data-drupal-selector="edit-submit" type="submit" id="edit-submit"
                                               value="Search"
                                               className="button js-form-submit form-submit btn btn-default form-control-sm"/>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {isAuthenticated ? userLinks : guestLinks}
                </div>
                <Consumer >{graphql =>   <NewPodcastForm  graphql={graphql} show={showNewPodcastModal} onClose={this.closeNewPodcastModal}/>}</Consumer>
            </nav>


        )
    }
}

NavigationBar.contextTypes = {
    router: PropTypes.object.isRequired
}
//
export default NavigationBar
