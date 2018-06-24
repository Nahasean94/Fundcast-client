import React from 'react'
import PodcastView from './PodcastView'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import shortid from 'shortid'
import {fetchPodcastsFeed, fetchPalPodcasts, fetchProfilePodcasts} from "../../shared/queries"
import {twinpalFetchOptionsOverride} from '../../shared/fetchOverrideOptions'
import {Query,Consumer} from 'graphql-react'


class PodcastsColumn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    render() {
        if (window.location.pathname === '/') {
            return (<Query
                loadOnMount
                loadOnReset
                fetchOptionsOverride={twinpalFetchOptionsOverride}
                query={fetchPodcastsFeed}
            >
                {({loading, data}) => {
                    if (data) {
                        if (data.fetchPodcastsFeed) {
                            return data.fetchPodcastsFeed.map(post =>
                                (
                                    <div key={shortid.generate()}>
                                        <Consumer>{graphql => <PodcastView post={post} graphql={graphql}/>}</Consumer>
                                    </div>
                                )
                            )
                        }
                    }
                    else if (loading) {
                        return <p>Loading…</p>
                    }
                    return <p>Loading failed.</p>
                }

                }
            </Query>)
        }
        else if (window.location.pathname === '/profile') {
            return (<Query
                loadOnMount
                loadOnReset
                fetchOptionsOverride={twinpalFetchOptionsOverride}
                query={fetchProfilePodcasts}
            >
                {({loading, data}) => {
                    if (data) {
                        if (data.fetchProfilePodcasts) {
                            return data.fetchProfilePodcasts.map(post =>
                                (
                                    <div key={shortid.generate()}>
                                        <Consumer>{graphql => <PodcastView post={post} graphql={graphql}/>}</Consumer>
                                    </div>
                                )
                            )
                        }
                    }
                    else if (loading) {
                        return <p>Loading…</p>
                    }
                    return <p>Loading failed.</p>
                }

                }
            </Query>)

        }
        else {
            return (<Query
                loadOnMount
                loadOnReset
                fetchOptionsOverride={twinpalFetchOptionsOverride}
                variables={{id: window.location.pathname.split('/')[2]}}
                query={fetchPalPodcasts}
            >
                {({loading, data}) => {
                    if (data) {
                        if (data.fetchPalPodcasts) {
                            return data.fetchPalPodcasts.map(post =>
                                (
                                    <div key={shortid.generate()}>
                                        <Consumer>{graphql => <PodcastView post={post} graphql={graphql}/>}</Consumer>
                                    </div>
                                )
                            )
                        }
                    }
                    else if (loading) {
                        return <p>Loading…</p>
                    }
                    return <p>Loading failed.</p>
                }

                }
            </Query>)

        }
    }

}
export default PodcastsColumn
