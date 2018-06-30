import React from 'react'
import PodcastView from './PodcastView'
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
                                        <Consumer>{graphql => <PodcastView podcast={podcast}
                                                                           graphql={graphql}/>}</Consumer>
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
