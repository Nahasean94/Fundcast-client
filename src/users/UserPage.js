import React, {Component} from 'react'
import {fetchUserProfile} from "../shared/queries"
import {fundcastFetchOptionsOverride} from "../shared/fetchOverrideOptions"
import {Query} from 'graphql-react'
import * as jwt from "jsonwebtoken"
import PropTypes from 'prop-types'

class UserPage extends Component {


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
                    <div className="col-sm-8 offset-sm-2">
                        <Query
                            loadOnMount
                            loadOnReset
                            fetchOptionsOverride={fundcastFetchOptionsOverride}
                            variables={{id: window.location.pathname.split('/')[2]}}
                            query={fetchUserProfile}
                        >
                            {({loading, data}) => {
                                if (data) {
                                    const {id, username, profile_picture, email, role, date_joined, address} = data.fetchUserProfile
                                    return <div>
                                        <ul className="list-unstyled">
                                            <li><img src={`http://localhost:8080/uploads/${profile_picture}`}
                                                     alt="Profile picture"
                                                     width="400"
                                                     height="300"/>
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
                                                Ethereum address: {address}
                                            </li>

                                        </ul>

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
                </div>
            </div>
        )
    }
}

UserPage.contextTypes = {
    router: PropTypes.object.isRequired
}
export default UserPage
