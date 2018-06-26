import React from 'react'
import PodcastView from './PodcastView'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import shortid from 'shortid'
import {podcasts, fetchPalPodcasts, fetchProfilePodcasts} from "../../shared/queries"
import {fundcastFetchOptionsOverride} from '../../shared/fetchOverrideOptions'
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
                fetchOptionsOverride={fundcastFetchOptionsOverride}
                query={podcasts}
            >
                {({loading, data}) => {
                    if (data) {
                        if (data.podcasts) {
                            return data.podcasts.map(podcast =>
                                (
                                    <div key={shortid.generate()}>
                                        <Consumer>{graphql => <PodcastView podcast={podcast} graphql={graphql}/>}</Consumer>
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
            // return (<Query
            //     loadOnMount
            //     loadOnReset
            //     fetchOptionsOverride={fundcastFetchOptionsOverride}
            //     query={fetchProfilePodcasts}
            // >
            //     {({loading, data}) => {
            //         if (data) {
            //             if (data.fetchProfilePodcasts) {
            //                 return data.fetchProfilePodcasts.map(podcast =>
            //                     (
            //                         <div key={shortid.generate()}>
            //                             <Consumer>{graphql => <PodcastView podcast={podcast} graphql={graphql}/>}</Consumer>
            //                         </div>
            //                     )
            //                 )
            //             }
            //         }
            //         else if (loading) {
            //             return <p>Loading…</p>
            //         }
            //         return <p>Loading failed.</p>
            //     }
            //
            //     }
            // </Query>)

        }
        else {
            // return (<Query
            //     loadOnMount
            //     loadOnReset
            //     fetchOptionsOverride={fundcastFetchOptionsOverride}
            //     variables={{id: window.location.pathname.split('/')[2]}}
            //     query={fetchPalPodcasts}
            // >
            //     {({loading, data}) => {
            //         if (data) {
            //             if (data.fetchPalPodcasts) {
            //                 return data.fetchPalPodcasts.map(podcast =>
            //                     (
            //                         <div key={shortid.generate()}>
            //                             <Consumer>{graphql => <PodcastView podcast={podcast} graphql={graphql}/>}</Consumer>
            //                         </div>
            //                     )
            //                 )
            //             }
            //         }
            //         else if (loading) {
            //             return <p>Loading…</p>
            //         }
            //         return <p>Loading failed.</p>
            //     }
            //
            //     }
            // </Query>)

        }
    }

}
export default PodcastsColumn
